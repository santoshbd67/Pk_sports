const express = require('express');
const {
  createOrder,
  getOrders,
  getOrder,
  cancelOrder,
} = require('../controllers/orderController');
const auth = require('../middleware/auth');

const router = express.Router();

router.use(auth); // All order routes require authentication

router.post('/', createOrder);
router.get('/', getOrders);
router.get('/:id', getOrder);
router.put('/:id/cancel', cancelOrder);

module.exports = router;