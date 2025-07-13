import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CreditCard, MapPin, Clock, ShoppingBag } from 'lucide-react'
import { useSelector, useDispatch } from 'react-redux'
import { clearCart } from '../../utils/cartSlice'
import { useAuth } from '../../contexts/AuthContext'
import { ordersAPI, paymentsAPI } from '../../lib/api'
import toast from 'react-hot-toast'

const CheckoutModal = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false)
  const [orderData, setOrderData] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    paymentMethod: 'card',
    notes: ''
  })
  
  const cartItems = useSelector((store) => store.cart)
  const dispatch = useDispatch()
  const { user } = useAuth()

  const totalPrice = cartItems.reduce((total, item) => {
    const itemPrice = item.card.info.price / 100 || item.card.info.defaultPrice / 100
    return total + itemPrice * item.quantity
  }, 0)

  const deliveryFee = 49
  const taxes = Math.round(totalPrice * 0.18)
  const finalTotal = totalPrice + deliveryFee + taxes

  const handleInputChange = (e) => {
    setOrderData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handlePlaceOrder = async () => {
    if (!orderData.street || !orderData.city || !orderData.state || !orderData.zipCode || !orderData.phone) {
      toast.error('Please fill in all required fields')
      return
    }

    setLoading(true)
    try {
      // Prepare order items
      const orderItems = cartItems.map(item => ({
        itemId: item.card.info.id,
        name: item.card.info.name,
        price: (item.card.info.price || item.card.info.defaultPrice) / 100,
        quantity: item.quantity,
        imageId: item.card.info.imageId
      }))

      // Create order
      const orderResponse = await ordersAPI.createOrder({
        items: orderItems,
        totalAmount: finalTotal,
        deliveryAddress: {
          street: orderData.street,
          city: orderData.city,
          state: orderData.state,
          zipCode: orderData.zipCode
        },
        phone: orderData.phone,
        paymentMethod: orderData.paymentMethod,
        notes: orderData.notes
      })

      if (orderData.paymentMethod === 'card') {
        // Create payment intent for card payments
        const paymentResponse = await paymentsAPI.createPaymentIntent(
          finalTotal,
          orderResponse.order._id
        )

        // In a real app, you would integrate with Stripe Elements here
        // For demo purposes, we'll simulate successful payment
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        await paymentsAPI.confirmPayment(paymentResponse.paymentIntentId)
      }

      // Clear cart and close modal
      dispatch(clearCart())
      onClose()
      toast.success('Order placed successfully! 🎉')
      
    } catch (error) {
      toast.error(error.message || 'Failed to place order. Please try again.')
      console.error('Order error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
            >
              <X size={20} />
            </button>

            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                <ShoppingBag className="text-orange-500" size={24} />
                Checkout
              </h2>
              <p className="text-gray-600">Review your order and complete payment</p>
            </div>

            {/* Order Summary */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-3">Order Summary</h3>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.card.info.id} className="flex justify-between text-sm">
                    <span>{item.card.info.name} x{item.quantity}</span>
                    <span>₹{((item.card.info.price || item.card.info.defaultPrice) / 100) * item.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="border-t pt-2 mt-2 space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>₹{totalPrice}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Delivery Fee</span>
                  <span>₹{deliveryFee}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Taxes & Fees</span>
                  <span>₹{taxes}</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-1">
                  <span>Total</span>
                  <span>₹{finalTotal}</span>
                </div>
              </div>
            </div>

            {/* Delivery Details */}
            <div className="space-y-4 mb-6">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                <MapPin className="text-orange-500" size={20} />
                Delivery Details
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    name="street"
                    value={orderData.street}
                    onChange={handleInputChange}
                    placeholder="Enter street address"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={orderData.city}
                    onChange={handleInputChange}
                    placeholder="Enter city"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State *
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={orderData.state}
                    onChange={handleInputChange}
                    placeholder="Enter state"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ZIP Code *
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={orderData.zipCode}
                    onChange={handleInputChange}
                    placeholder="Enter ZIP code"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={orderData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Special Instructions
                </label>
                <input
                  type="text"
                  name="notes"
                  value={orderData.notes}
                  onChange={handleInputChange}
                  placeholder="Any special requests..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-3">
                <CreditCard className="text-orange-500" size={20} />
                Payment Method
              </h3>
              <div className="space-y-2">
                <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={orderData.paymentMethod === 'card'}
                    onChange={handleInputChange}
                    className="mr-3"
                  />
                  <CreditCard size={20} className="mr-2 text-gray-600" />
                  Credit/Debit Card
                </label>
                <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={orderData.paymentMethod === 'cod'}
                    onChange={handleInputChange}
                    className="mr-3"
                  />
                  <Clock size={20} className="mr-2 text-gray-600" />
                  Cash on Delivery
                </label>
              </div>
            </div>

            {/* Estimated Delivery */}
            <div className="mb-6 p-4 bg-orange-50 rounded-lg">
              <div className="flex items-center gap-2 text-orange-700">
                <Clock size={20} />
                <span className="font-semibold">Estimated Delivery: 30-45 minutes</span>
              </div>
            </div>

            {/* Place Order Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePlaceOrder}
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-lg font-semibold text-lg hover:from-orange-600 hover:to-red-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing Order...' : `Place Order - ₹${finalTotal}`}
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default CheckoutModal