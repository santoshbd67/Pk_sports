const pool = require('../config/database');

class Category {
  static async getAll() {
    const query = 'SELECT * FROM categories ORDER BY name';
    const result = await pool.query(query);
    return result.rows;
  }

  static async getById(id) {
    const query = 'SELECT * FROM categories WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }
}

module.exports = Category;