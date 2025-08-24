const Cart = require('../models/Cart');

const getCart = async (req, res) => {
  try {
    const cartItems = await Cart.getByUserId(req.user.userId);
    const total = await Cart.getCartTotal(req.user.userId);
    
    res.json({
      items: cartItems,
      total: parseFloat(total),
    });
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1, size, color } = req.body;
    
    const cartItem = await Cart.addItem(req.user.userId, productId, quantity, size, color);
    
    res.status(201).json({
      message: 'Item added to cart',
      item: cartItem,
    });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateCartItem = async (req, res) => {
  try {
    const { productId, quantity, size, color } = req.body;
    
    const cartItem = await Cart.updateItem(req.user.userId, productId, quantity, size, color);
    
    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }
    
    res.json({
      message: 'Cart item updated',
      item: cartItem,
    });
  } catch (error) {
    console.error('Update cart item error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const { size, color } = req.query;
    
    const removedItem = await Cart.removeItem(req.user.userId, productId, size, color);
    
    if (!removedItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }
    
    res.json({
      message: 'Item removed from cart',
    });
  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const clearCart = async (req, res) => {
  try {
    await Cart.clearCart(req.user.userId);
    
    res.json({
      message: 'Cart cleared',
    });
  } catch (error) {
    console.error('Clear cart error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
};