import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package, Calendar, DollarSign, Eye } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchOrders();
    }
  }, [isAuthenticated]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await api.get('/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async (orderId) => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      try {
        await api.put(`/orders/${orderId}/cancel`);
        fetchOrders(); // Refresh orders
        toast.success('Order cancelled successfully');
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to cancel order');
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-secondary-100 text-secondary-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-secondary-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <Package className="h-16 w-16 text-secondary-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">
              Please sign in to view your orders
            </h2>
            <p className="text-secondary-600 mb-8">
              You need to be logged in to access your order history.
            </p>
            <div className="space-x-4">
              <Link to="/login" className="btn-primary">
                Sign In
              </Link>
              <Link to="/register" className="btn-secondary">
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-secondary-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-secondary-200 rounded w-48 mb-8"></div>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg p-6">
                  <div className="space-y-3">
                    <div className="h-4 bg-secondary-200 rounded w-3/4"></div>
                    <div className="h-3 bg-secondary-200 rounded w-1/2"></div>
                    <div className="h-4 bg-secondary-200 rounded w-1/4"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-secondary-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-secondary-900 mb-8">Order History</h1>
          
          <div className="text-center py-12">
            <Package className="h-16 w-16 text-secondary-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">
              No orders yet
            </h2>
            <p className="text-secondary-600 mb-8">
              You haven't placed any orders yet. Start shopping to see your orders here.
            </p>
            <Link to="/products" className="btn-primary">
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary-900">Order History</h1>
          <p className="text-secondary-600 mt-2">
            Track and manage your orders
          </p>
        </div>

        <div className="space-y-6">
          {orders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-sm overflow-hidden"
            >
              {/* Order Header */}
              <div className="p-6 border-b border-secondary-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                    <div>
                      <h3 className="text-lg font-semibold text-secondary-900">
                        Order #{order.id.slice(0, 8).toUpperCase()}
                      </h3>
                      <div className="flex items-center space-x-4 mt-1 text-sm text-secondary-600">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(order.created_at)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <DollarSign className="h-4 w-4" />
                          <span>₹{(parseFloat(order.total_amount) * 83).toFixed(0)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                    <Link
                      to={`/orders/${order.id}`}
                      className="flex items-center space-x-1 text-primary-600 hover:text-primary-700 transition-colors"
                    >
                      <Eye className="h-4 w-4" />
                      <span>View Details</span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Order Items Preview */}
              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {order.items && order.items.slice(0, 4).map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center space-x-3">
                      <img
                        src={item.product_image}
                        alt={item.product_name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-secondary-900 truncate">
                          {item.product_name}
                        </p>
                        <p className="text-xs text-secondary-600">
                          Qty: {item.quantity}
                        </p>
                        {(item.size || item.color) && (
                          <p className="text-xs text-secondary-600">
                            {item.size && `Size: ${item.size}`} {item.color && `Color: ${item.color}`}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {order.items && order.items.length > 4 && (
                    <div className="flex items-center justify-center text-sm text-secondary-600">
                      +{order.items.length - 4} more items
                    </div>
                  )}
                </div>

                {/* Order Actions */}
                <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-4 border-t border-secondary-200">
                  <Link
                    to={`/orders/${order.id}`}
                    className="btn-primary flex-1 sm:flex-none text-center"
                  >
                    View Order Details
                  </Link>
                  
                  {order.status === 'delivered' && (
                    <button className="btn-secondary flex-1 sm:flex-none">
                      Write Review
                    </button>
                  )}
                  
                  {(order.status === 'pending' || order.status === 'confirmed') && (
                    <button 
                      onClick={() => handleCancelOrder(order.id)}
                      className="btn-secondary flex-1 sm:flex-none text-red-600 border-red-300 hover:bg-red-50"
                    >
                      Cancel Order
                    </button>
                  )}
                  
                  <button className="btn-secondary flex-1 sm:flex-none">
                    Reorder Items
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load More Button (if needed) */}
        {orders.length >= 10 && (
          <div className="text-center mt-8">
            <button className="btn-secondary">
              Load More Orders
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;