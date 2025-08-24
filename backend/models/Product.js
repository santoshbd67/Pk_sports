const pool = require('../config/database');

class Product {
  static async getAll(filters = {}) {
    let query = `
      SELECT p.*, c.name as category_name 
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE 1=1
    `;
    const params = [];
    let paramCount = 0;

    if (filters.category) {
      paramCount++;
      query += ` AND c.name ILIKE $${paramCount}`;
      params.push(`%${filters.category}%`);
    }

    if (filters.search) {
      paramCount++;
      query += ` AND (p.name ILIKE $${paramCount} OR p.description ILIKE $${paramCount} OR p.brand ILIKE $${paramCount})`;
      params.push(`%${filters.search}%`);
    }

    if (filters.minPrice) {
      paramCount++;
      query += ` AND p.price >= $${paramCount}`;
      params.push(filters.minPrice);
    }

    if (filters.maxPrice) {
      paramCount++;
      query += ` AND p.price <= $${paramCount}`;
      params.push(filters.maxPrice);
    }

    if (filters.brand) {
      paramCount++;
      query += ` AND p.brand ILIKE $${paramCount}`;
      params.push(`%${filters.brand}%`);
    }

    // Sorting
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'price_asc':
          query += ' ORDER BY p.price ASC';
          break;
        case 'price_desc':
          query += ' ORDER BY p.price DESC';
          break;
        case 'rating':
          query += ' ORDER BY p.rating DESC';
          break;
        case 'newest':
          query += ' ORDER BY p.created_at DESC';
          break;
        default:
          query += ' ORDER BY p.created_at DESC';
      }
    } else {
      query += ' ORDER BY p.created_at DESC';
    }

    const result = await pool.query(query, params);
    return result.rows;
  }

  static async getById(id) {
    const query = `
      SELECT p.*, c.name as category_name 
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id 
      WHERE p.id = $1
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async getFeatured() {
    const query = `
      SELECT p.*, c.name as category_name 
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id 
      WHERE p.is_featured = true 
      ORDER BY p.created_at DESC
    `;
    const result = await pool.query(query);
    return result.rows;
  }

  static async getByCategory(categoryId) {
    const query = `
      SELECT p.*, c.name as category_name 
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id 
      WHERE p.category_id = $1 
      ORDER BY p.created_at DESC
    `;
    const result = await pool.query(query, [categoryId]);
    return result.rows;
  }
}

module.exports = Product;