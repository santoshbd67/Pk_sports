const pool = require('../config/database');

class Cart {
  static async getByUserId(userId) {
    const query = `
      SELECT c.*, p.name, p.price, p.image_url, p.brand
      FROM cart c
      JOIN products p ON c.product_id = p.id
      WHERE c.user_id = $1
      ORDER BY c.created_at DESC
    `;
    const result = await pool.query(query, [userId]);
    return result.rows;
  }

  static async addItem(userId, productId, quantity, size, color) {
    const query = `
      INSERT INTO cart (user_id, product_id, quantity, size, color)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (user_id, product_id, size, color)
      DO UPDATE SET quantity = cart.quantity + $3, updated_at = CURRENT_TIMESTAMP
      RETURNING *
    `;
    const result = await pool.query(query, [userId, productId, quantity, size, color]);
    return result.rows[0];
  }

  static async updateItem(userId, productId, quantity, size, color) {
    const query = `
      UPDATE cart 
      SET quantity = $3, updated_at = CURRENT_TIMESTAMP
      WHERE user_id = $1 AND product_id = $2 AND size = $4 AND color = $5
      RETURNING *
    `;
    const result = await pool.query(query, [userId, productId, quantity, size, color]);
    return result.rows[0];
  }

  static async removeItem(userId, productId, size, color) {
    const query = `
      DELETE FROM cart 
      WHERE user_id = $1 AND product_id = $2 AND size = $3 AND color = $4
      RETURNING *
    `;
    const result = await pool.query(query, [userId, productId, size, color]);
    return result.rows[0];
  }

  static async clearCart(userId) {
    const query = 'DELETE FROM cart WHERE user_id = $1';
    await pool.query(query, [userId]);
  }

  static async getCartTotal(userId) {
    const query = `
      SELECT SUM(c.quantity * p.price) as total
      FROM cart c
      JOIN products p ON c.product_id = p.id
      WHERE c.user_id = $1
    `;
    const result = await pool.query(query, [userId]);
    return result.rows[0].total || 0;
  }
}

module.exports = Cart;