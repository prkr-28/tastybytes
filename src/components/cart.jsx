import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { clearCart, removeItem } from '../utils/cartSlice';
import { Trash2, Plus, Minus, ShoppingBag, CreditCard } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import CheckoutModal from './payment/CheckoutModal';
import AuthModal from './auth/AuthModal';

const Cart = () => {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const cartItems = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  const { user } = useAuth();

  // Total price calculation
  const totalPrice = cartItems.reduce((total, item) => {
    const itemPrice =
      item.card.info.price / 100 || item.card.info.defaultPrice / 100;
    return total + itemPrice * item.quantity;
  }, 0);

  const deliveryFee = cartItems.length > 0 ? 49 : 0;
  const taxes = Math.round(totalPrice * 0.18);
  const finalTotal = totalPrice + deliveryFee + taxes;

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.success('Cart cleared');
  };

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
    toast.success('Item removed');
  };

  const handleCheckout = () => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    setIsCheckoutOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-3">
            <ShoppingBag className="text-orange-500" size={32} />
            Your Cart
          </h1>
          <p className="text-gray-600">
            {cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart
          </p>
        </motion.div>

        {cartItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16 bg-white rounded-2xl shadow-lg"
          >
            <ShoppingBag size={64} className="text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Your cart is empty</h3>
            <p className="text-gray-500 mb-6">Add some delicious items to get started!</p>
            <motion.a
              href="/"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-lg font-medium hover:from-orange-600 hover:to-red-600 transition-all"
            >
              Browse Restaurants
            </motion.a>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">Order Items</h2>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleClearCart}
                    className="text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <Trash2 size={18} />
                    Clear All
                  </motion.button>
                </div>

                <div className="space-y-4">
                  <AnimatePresence>
                    {cartItems.map((item, index) => (
                      <motion.div
                        key={item.card.info.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl hover:shadow-md transition-shadow"
                      >
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800 mb-1">
                            {item.card.info.name}
                          </h3>
                          <p className="text-lg font-bold text-green-600">
                            ₹{((item.card.info.price || item.card.info.defaultPrice) / 100) * item.quantity}
                          </p>
                          <p className="text-sm text-gray-500">
                            ₹{(item.card.info.price || item.card.info.defaultPrice) / 100} each
                          </p>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleRemoveItem(item.card.info.id)}
                              className="p-1 hover:bg-gray-200 rounded"
                            >
                              <Minus size={16} />
                            </motion.button>
                            <span className="px-3 py-1 font-semibold">{item.quantity}</span>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="p-1 hover:bg-gray-200 rounded"
                            >
                              <Plus size={16} />
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl shadow-lg p-6 sticky top-24"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">₹{totalPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className="font-semibold">₹{deliveryFee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Taxes & Fees</span>
                    <span className="font-semibold">₹{taxes}</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-green-600">₹{finalTotal}</span>
                    </div>
                  </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCheckout}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-xl font-semibold text-lg hover:from-orange-600 hover:to-red-600 transition-all flex items-center justify-center gap-2"
                >
                  <CreditCard size={20} />
                  Proceed to Checkout
                </motion.button>

                <p className="text-xs text-gray-500 text-center mt-3">
                  Estimated delivery: 30-45 minutes
                </p>
              </motion.div>
            </div>
          </div>
        )}
      </div>

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode="signin"
      />
    </div>
  );
};

export default Cart;
