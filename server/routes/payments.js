const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/Order');
const auth = require('../middleware/auth');

const router = express.Router();

// Create payment intent
router.post('/create-intent', auth, async (req, res) => {
  try {
    const { amount, orderId } = req.body;

    // Validate order belongs to user
    const order = await Order.findOne({
      _id: orderId,
      user: req.userId
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'inr',
      metadata: {
        orderId: orderId,
        userId: req.userId
      }
    });

    // Update order with payment intent ID
    order.stripePaymentIntentId = paymentIntent.id;
    await order.save();

    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    });
  } catch (error) {
    console.error('Create payment intent error:', error);
    res.status(500).json({ 
      message: 'Failed to create payment intent', 
      error: error.message 
    });
  }
});

// Confirm payment
router.post('/confirm', auth, async (req, res) => {
  try {
    const { paymentIntentId } = req.body;

    // Retrieve payment intent from Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === 'succeeded') {
      // Update order payment status
      const order = await Order.findOneAndUpdate(
        { 
          stripePaymentIntentId: paymentIntentId,
          user: req.userId 
        },
        { 
          paymentStatus: 'completed',
          orderStatus: 'confirmed'
        },
        { new: true }
      );

      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }

      res.json({
        message: 'Payment confirmed successfully',
        order
      });
    } else {
      res.status(400).json({ 
        message: 'Payment not completed',
        status: paymentIntent.status 
      });
    }
  } catch (error) {
    console.error('Confirm payment error:', error);
    res.status(500).json({ 
      message: 'Failed to confirm payment', 
      error: error.message 
    });
  }
});

// Webhook for Stripe events
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body, 
      sig, 
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      
      // Update order status
      await Order.findOneAndUpdate(
        { stripePaymentIntentId: paymentIntent.id },
        { 
          paymentStatus: 'completed',
          orderStatus: 'confirmed'
        }
      );
      break;

    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object;
      
      // Update order status
      await Order.findOneAndUpdate(
        { stripePaymentIntentId: failedPayment.id },
        { paymentStatus: 'failed' }
      );
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
});

module.exports = router;