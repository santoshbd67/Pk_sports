import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Cart = () => {
  const { cart, updateCartItem, removeFromCart, loading } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity < 1) return;
    updateCartItem(item.product_id, newQuantity, item.size, item.color);
  };

  const handleRemoveItem = (item) => {
    removeFromCart(item.product_id, item.size, item.color);
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: '/checkout' } } });
      return;
    }
    navigate('/checkout');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-secondary-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-secondary-200 rounded w-48 mb-8"></div>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg p-6">
                  <div className="flex space-x-4">
                    <div className="w-20 h-20 bg-secondary-200 rounded"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-secondary-200 rounded w-3/4"></div>
                      <div className="h-3 bg-secondary-200 rounded w-1/2"></div>
                      <div className="h-4 bg-secondary-200 rounded w-1/4"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-secondary-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <ShoppingBag className="h-16 w-16 text-secondary-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">
              Please sign in to view your cart
            </h2>
            <p className="text-secondary-600 mb-8">
              You need to be logged in to access your shopping cart.
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

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-secondary-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <ShoppingBag className="h-16 w-16 text-secondary-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">
              Your cart is empty
            </h2>
            <p className="text-secondary-600 mb-8">
              Looks like you haven't added any items to your cart yet.
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
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-secondary-900">Shopping Cart</h1>
            <Link
              to="/products"
              className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 transition-colors text-sm sm:text-base"
            >
              <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="hidden sm:inline">Continue Shopping</span>
              <span className="sm:hidden">Shop</span>
            </Link>
          </div>
          <p className="text-secondary-600">
            {cart.items.length} item{cart.items.length !== 1 ? 's' : ''} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.items.map((item, index) => (
              <motion.div
                key={`${item.product_id}-${item.size}-${item.color}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-sm p-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg font-semibold text-secondary-900 line-clamp-2">
                      {item.name}
                    </h3>
                    <p className="text-sm sm:text-base text-secondary-600">{item.brand}</p>
                    
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-2">
                      {item.size && (
                        <span className="text-xs sm:text-sm text-secondary-600">
                          Size: <span className="font-medium">{item.size}</span>
                        </span>
                      )}
                      {item.color && (
                        <span className="text-xs sm:text-sm text-secondary-600">
                          Color: <span className="font-medium">{item.color}</span>
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-3 sm:mt-4 space-y-3 sm:space-y-0">
                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between sm:justify-start">
                        <div className="flex items-center space-x-3 bg-secondary-50 rounded-lg p-1">
                          <button
                            onClick={() => handleQuantityChange(item, item.quantity - 1)}
                            className="p-2 rounded-lg hover:bg-white transition-colors"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-8 text-center font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(item, item.quantity + 1)}
                            className="p-2 rounded-lg hover:bg-white transition-colors"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        
                        <span className="text-lg sm:text-xl font-bold text-primary-600 sm:hidden">
                          ₹{(item.price * item.quantity * 83).toFixed(0)}
                        </span>
                      </div>

                      {/* Price and Actions */}
                      <div className="flex items-center justify-between sm:justify-end space-x-3">
                        <span className="text-xl font-bold text-primary-600 hidden sm:block">
                          ₹{(item.price * item.quantity * 83).toFixed(0)}
                        </span>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => {
                              const message = `Hi! I have ${item.name} in my cart. Can you confirm availability and delivery details?\n\nItem: ${item.name}\nBrand: ${item.brand}\nQuantity: ${item.quantity}\nPrice: ₹${(item.price * item.quantity * 83).toFixed(0)}`;
                              window.open(`https://wa.me/918884344214?text=${encodeURIComponent(message)}`, '_blank');
                            }}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-full transition-colors"
                            title="WhatsApp Enquiry"
                          >
                            <MessageCircle className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleRemoveItem(item)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-sm p-6 sticky top-24"
            >
              <h2 className="text-xl font-semibold text-secondary-900 mb-4">
                Order Summary
              </h2>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-secondary-600">Subtotal</span>
                  <span className="font-medium">₹{(cart.total * 83).toFixed(0)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-secondary-600">Shipping</span>
                  <span className="font-medium">
                    {cart.total >= 25 ? 'Free' : '₹499'}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-secondary-600">GST (18%)</span>
                  <span className="font-medium">
                    ₹{(cart.total * 83 * 0.18).toFixed(0)}
                  </span>
                </div>
                
                <div className="border-t border-secondary-200 pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-lg font-bold text-primary-600">
                      ₹{((cart.total * 83) + (cart.total >= 25 ? 0 : 499) + (cart.total * 83 * 0.18)).toFixed(0)}
                    </span>
                  </div>
                </div>
              </div>

              {cart.total < 25 && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    Add ₹{((25 - cart.total) * 83).toFixed(0)} more for free shipping!
                  </p>
                </div>
              )}

              <button
                onClick={handleCheckout}
                className="w-full btn-primary mt-6"
              >
                Proceed to Checkout
              </button>

              <div className="mt-4 text-center">
                <Link
                  to="/products"
                  className="text-primary-600 hover:text-primary-700 text-sm transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;