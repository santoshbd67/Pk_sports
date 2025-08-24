const express = require('express');
const {
  getProducts,
  getProduct,
  getFeaturedProducts,
  getCategories,
  getProductsByCategory,
} = require('../controllers/productController');

const router = express.Router();

router.get('/', getProducts);
router.get('/featured', getFeaturedProducts);
router.get('/categories', getCategories);
router.get('/category/:categoryId', getProductsByCategory);
router.get('/:id', getProduct);

module.exports = router;