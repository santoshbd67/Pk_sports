const Order = require('../models/Order');
const Cart = require('../models/Cart');

const createOrder = async (req, res) => {
  try {
    const { shippingAddress, paymentMethod } = req.body;
    
    // Get cart items
    const cartItems = await Cart.getByUserId(req.user.userId);
    
    if (cartItems.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }
    
    // Calculate total
    const totalAmount = await Cart.getCartTotal(req.user.userId);
    
    // Prepare order items
    const items = cartItems.map(item => ({
      product_id: item.product_id,
      quantity: item.quantity,
      price: item.price,
      size: item.size,
      color: item.color,
    }));
    
    // Create order
    const order = await Order.create({
      userId: req.user.userId,
      items,
      totalAmount,
      shippingAddress,
      paymentMethod,
    });
    
    res.status(201).json({
      message: 'Order created successfully',
      order,
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.getByUserId(req.user.userId);
    res.json(orders);
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.getById(id);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    // Check if order belongs to user
    if (order.user_id !== req.user.userId) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    res.json(order);
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;
    
    const order = await Order.getById(id);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    // Check if order belongs to user
    if (order.user_id !== req.user.userId) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    // Check if order can be cancelled
    if (order.status === 'shipped' || order.status === 'delivered' || order.status === 'cancelled') {
      return res.status(400).json({ message: 'Order cannot be cancelled' });
    }
    
    // Cancel the order
    const cancelledOrder = await Order.cancel(id);
    
    res.json({
      message: 'Order cancelled successfully',
      order: cancelledOrder,
    });
  } catch (error) {
    console.error('Cancel order error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrder,
  cancelOrder,
};