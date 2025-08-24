import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CreditCard, MapPin, User, Lock } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import toast from 'react-hot-toast';

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Shipping Address
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India',
    
    // Payment
    paymentMethod: 'upi_qr',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    
    // Billing same as shipping
    billingAddressSame: true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Prepare shipping address
      const shippingAddress = `${formData.firstName} ${formData.lastName}\n${formData.address}\n${formData.city}, ${formData.state} ${formData.zipCode}\n${formData.country}`;
      
      // Create order
      const orderData = {
        shippingAddress,
        paymentMethod: formData.paymentMethod
      };

      const response = await api.post('/orders', orderData);
      
      if (response.data) {
        toast.success('Order placed successfully!');
        await clearCart();
        navigate(`/orders/${response.data.order.id}`);
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error(error.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  const subtotal = cart.total * 83;
  const shipping = cart.total >= 25 ? 0 : 499;
  const tax = subtotal * 0.18;
  const total = subtotal + shipping + tax;

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-secondary-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">
              Your cart is empty
            </h2>
            <p className="text-secondary-600 mb-8">
              Add some items to your cart before checking out.
            </p>
            <button
              onClick={() => navigate('/products')}
              className="btn-primary"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-secondary-900">Checkout</h1>
          <p className="text-secondary-600 mt-2 text-sm sm:text-base">Complete your order</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Left Column - Forms */}
            <div className="space-y-6 lg:space-y-8">
              {/* Shipping Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg shadow-sm p-6"
              >
                <div className="flex items-center space-x-2 mb-6">
                  <MapPin className="h-5 w-5 text-primary-600" />
                  <h2 className="text-lg sm:text-xl font-semibold">Shipping Information</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className="input-field"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      className="input-field"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="input-field"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="input-field"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Address *
                    </label>
                    <input
                      type="text"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="Street address"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      className="input-field"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      State *
                    </label>
                    <input
                      type="text"
                      name="state"
                      required
                      value={formData.state}
                      onChange={handleChange}
                      className="input-field"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      ZIP Code *
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      required
                      value={formData.zipCode}
                      onChange={handleChange}
                      className="input-field"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Country *
                    </label>
                    <select
                      name="country"
                      required
                      value={formData.country}
                      onChange={handleChange}
                      className="input-field"
                    >
                      <option value="India">India</option>
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                    </select>
                  </div>
                </div>
              </motion.div>

              {/* Payment Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white rounded-lg shadow-sm p-6"
              >
                <div className="flex items-center space-x-2 mb-6">
                  <CreditCard className="h-5 w-5 text-primary-600" />
                  <h2 className="text-xl font-semibold">Payment Information</h2>
                </div>

                <div className="space-y-4">
                  {/* Payment Method */}
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      Payment Method
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="credit_card"
                          checked={formData.paymentMethod === 'credit_card'}
                          onChange={handleChange}
                          className="mr-2"
                        />
                        Credit Card
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="paypal"
                          checked={formData.paymentMethod === 'paypal'}
                          onChange={handleChange}
                          className="mr-2"
                        />
                        PayPal
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="upi_qr"
                          checked={formData.paymentMethod === 'upi_qr'}
                          onChange={handleChange}
                          className="mr-2"
                        />
                        UPI / QR Code
                      </label>
                    </div>
                  </div>

                  {formData.paymentMethod === 'credit_card' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-secondary-700 mb-2">
                          Card Number *
                        </label>
                        <input
                          type="text"
                          name="cardNumber"
                          required
                          value={formData.cardNumber}
                          onChange={handleChange}
                          className="input-field"
                          placeholder="1234 5678 9012 3456"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-secondary-700 mb-2">
                            Expiry Date *
                          </label>
                          <input
                            type="text"
                            name="expiryDate"
                            required
                            value={formData.expiryDate}
                            onChange={handleChange}
                            className="input-field"
                            placeholder="MM/YY"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-secondary-700 mb-2">
                            CVV *
                          </label>
                          <input
                            type="text"
                            name="cvv"
                            required
                            value={formData.cvv}
                            onChange={handleChange}
                            className="input-field"
                            placeholder="123"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-secondary-700 mb-2">
                          Name on Card *
                        </label>
                        <input
                          type="text"
                          name="cardName"
                          required
                          value={formData.cardName}
                          onChange={handleChange}
                          className="input-field"
                        />
                      </div>
                    </>
                  )}

                  {formData.paymentMethod === 'upi_qr' && (
                    <div className="text-center p-6 bg-secondary-50 rounded-lg">
                      <h3 className="text-lg font-semibold mb-4">Scan QR Code to Pay</h3>
                      <div className="bg-white p-4 rounded-lg inline-block mb-4">
                        <img
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=pksports@paytm&pn=PK Sports&am=${total.toFixed(0)}&cu=INR&tn=Order Payment`}
                          alt="UPI QR Code"
                          className="w-48 h-48"
                        />
                      </div>
                      <div className="space-y-2 text-sm text-secondary-600">
                        <p><strong>UPI ID:</strong> pksports@paytm</p>
                        <p><strong>Amount:</strong> ₹{total.toFixed(0)}</p>
                        <p>Scan with any UPI app (PhonePe, Google Pay, Paytm)</p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Right Column - Order Summary */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-lg shadow-sm p-6 sticky top-24"
              >
                <h2 className="text-xl font-semibold text-secondary-900 mb-6">
                  Order Summary
                </h2>

                {/* Order Items */}
                <div className="space-y-4 mb-6">
                  {cart.items.map((item) => (
                    <div key={`${item.product_id}-${item.size}-${item.color}`} className="flex items-center space-x-3">
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-secondary-900 truncate">
                          {item.name}
                        </p>
                        <p className="text-xs text-secondary-600">
                          {item.size && `Size: ${item.size}`} {item.color && `Color: ${item.color}`}
                        </p>
                        <p className="text-xs text-secondary-600">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <span className="text-sm font-medium">
                        ₹{(item.price * item.quantity * 83).toFixed(0)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Order Totals */}
                <div className="space-y-3 border-t border-secondary-200 pt-4">
                  <div className="flex justify-between">
                    <span className="text-secondary-600">Subtotal</span>
                    <span className="font-medium">₹{subtotal.toFixed(0)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-secondary-600">Shipping</span>
                    <span className="font-medium">
                      {shipping === 0 ? 'Free' : `₹${shipping}`}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-secondary-600">GST (18%)</span>
                    <span className="font-medium">₹{tax.toFixed(0)}</span>
                  </div>
                  
                  <div className="flex justify-between text-lg font-bold border-t border-secondary-200 pt-3">
                    <span>Total</span>
                    <span className="text-primary-600">₹{total.toFixed(0)}</span>
                  </div>
                </div>

                {/* Place Order Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Processing...' : `Place Order - ₹${total.toFixed(0)}`}
                </button>

                {/* Security Notice */}
                <div className="flex items-center justify-center space-x-2 mt-4 text-sm text-secondary-600">
                  <Lock className="h-4 w-4" />
                  <span>Secure checkout powered by SSL encryption</span>
                </div>
              </motion.div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;