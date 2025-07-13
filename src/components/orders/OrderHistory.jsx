import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Clock, MapPin, Phone, Package, CheckCircle, XCircle, Truck } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { ordersAPI } from '../../lib/api'
import { format } from 'date-fns'
import toast from 'react-hot-toast'

const OrderHistory = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [pagination, setPagination] = useState({})
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      fetchOrders()
    }
  }, [user])

  const fetchOrders = async (page = 1) => {
    try {
      setLoading(true)
      const response = await ordersAPI.getUserOrders(page, 10)
      setOrders(response.orders)
      setPagination(response.pagination)
    } catch (error) {
      toast.error('Failed to fetch orders')
      console.error('Error fetching orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCancelOrder = async (orderId) => {
    try {
      await ordersAPI.cancelOrder(orderId)
      toast.success('Order cancelled successfully')
      fetchOrders() // Refresh orders
    } catch (error) {
      toast.error('Failed to cancel order')
      console.error('Error cancelling order:', error)
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="text-yellow-500" size={20} />
      case 'confirmed':
        return <CheckCircle className="text-blue-500" size={20} />
      case 'preparing':
        return <Package className="text-orange-500" size={20} />
      case 'out_for_delivery':
        return <Truck className="text-purple-500" size={20} />
      case 'delivered':
        return <CheckCircle className="text-green-500" size={20} />
      case 'cancelled':
        return <XCircle className="text-red-500" size={20} />
      default:
        return <Clock className="text-gray-500" size={20} />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'confirmed':
        return 'bg-blue-100 text-blue-800'
      case 'preparing':
        return 'bg-orange-100 text-orange-800'
      case 'out_for_delivery':
        return 'bg-purple-100 text-purple-800'
      case 'delivered':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'out_for_delivery':
        return 'Out for Delivery'
      default:
        return status.charAt(0).toUpperCase() + status.slice(1)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your orders...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Order History</h1>
          <p className="text-gray-600">Track your past orders and reorder your favorites</p>
        </motion.div>

        {orders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <Package size={64} className="text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No orders yet</h3>
            <p className="text-gray-500">Start ordering to see your history here!</p>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, index) => (
              <motion.div
                key={order._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                  <div className="flex items-center gap-3 mb-2 lg:mb-0">
                    {getStatusIcon(order.orderStatus)}
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        Order #{order._id.slice(-8)}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {format(new Date(order.createdAt), 'MMM dd, yyyy • hh:mm a')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.orderStatus)}`}>
                      {getStatusText(order.orderStatus)}
                    </span>
                    <span className="text-lg font-bold text-gray-800">
                      ₹{order.totalAmount}
                    </span>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-start gap-2">
                    <MapPin className="text-gray-400 mt-1" size={16} />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Delivery Address</p>
                      <p className="text-sm text-gray-600">
                        {order.deliveryAddress.street}, {order.deliveryAddress.city}, {order.deliveryAddress.state} {order.deliveryAddress.zipCode}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Phone className="text-gray-400 mt-1" size={16} />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Contact</p>
                      <p className="text-sm text-gray-600">{order.phone}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Items Ordered</p>
                  <div className="space-y-1">
                    {order.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex justify-between text-sm text-gray-600">
                        <span>{item.name} x{item.quantity}</span>
                        <span>₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {order.notes && (
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-700">Special Instructions</p>
                    <p className="text-sm text-gray-600">{order.notes}</p>
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="text-sm text-gray-500">
                    Payment: {order.paymentMethod.toUpperCase()} • {order.paymentStatus}
                  </div>
                  {order.orderStatus === 'pending' && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleCancelOrder(order._id)}
                      className="px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      Cancel Order
                    </motion.button>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className="flex justify-center mt-8">
                <div className="flex gap-2">
                  {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((page) => (
                    <motion.button
                      key={page}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => fetchOrders(page)}
                      className={`px-4 py-2 rounded-lg ${
                        page === pagination.page
                          ? 'bg-orange-500 text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default OrderHistory