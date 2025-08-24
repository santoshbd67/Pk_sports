const pool = require('../config/database');

class Order {
  static async create(orderData) {
    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');
      
      const { userId, items, totalAmount, shippingAddress, paymentMethod } = orderData;
      
      // Create order
      const orderQuery = `
        INSERT INTO orders (user_id, total_amount, shipping_address, payment_method, status, payment_status)
        VALUES ($1, $2, $3, $4, 'confirmed', 'completed')
        RETURNING *
      `;
      const orderResult = await client.query(orderQuery, [userId, totalAmount, shippingAddress, paymentMethod]);
      const order = orderResult.rows[0];
      
      // Create order items
      for (const item of items) {
        const itemQuery = `
          INSERT INTO order_items (order_id, product_id, quantity, price, size, color)
          VALUES ($1, $2, $3, $4, $5, $6)
        `;
        await client.query(itemQuery, [order.id, item.product_id, item.quantity, item.price, item.size, item.color]);
      }
      
      // Clear cart
      await client.query('DELETE FROM cart WHERE user_id = $1', [userId]);
      
      await client.query('COMMIT');
      return order;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  static async getByUserId(userId) {
    const query = `
      SELECT o.*, 
        json_agg(
          json_build_object(
            'id', oi.id,
            'product_id', oi.product_id,
            'product_name', p.name,
            'product_image', p.image_url,
            'quantity', oi.quantity,
            'price', oi.price,
            'size', oi.size,
            'color', oi.color
          )
        ) as items
      FROM orders o
      LEFT JOIN order_items oi ON o.id = oi.order_id
      LEFT JOIN products p ON oi.product_id = p.id
      WHERE o.user_id = $1
      GROUP BY o.id
      ORDER BY o.created_at DESC
    `;
    const result = await pool.query(query, [userId]);
    return result.rows;
  }

  static async getById(orderId) {
    const query = `
      SELECT o.*, 
        json_agg(
          json_build_object(
            'id', oi.id,
            'product_id', oi.product_id,
            'product_name', p.name,
            'product_image', p.image_url,
            'quantity', oi.quantity,
            'price', oi.price,
            'size', oi.size,
            'color', oi.color
          )
        ) as items
      FROM orders o
      LEFT JOIN order_items oi ON o.id = oi.order_id
      LEFT JOIN products p ON oi.product_id = p.id
      WHERE o.id = $1
      GROUP BY o.id
    `;
    const result = await pool.query(query, [orderId]);
    return result.rows[0];
  }

  static async cancel(orderId) {
    const query = `
      UPDATE orders 
      SET status = 'cancelled', updated_at = CURRENT_TIMESTAMP
      WHERE id = $1
      RETURNING *
    `;
    const result = await pool.query(query, [orderId]);
    return result.rows[0];
  }
}

module.exports = Order;