// const express = require('express');
// const router = express.Router();
// const OrderController = require('../controllers/OrderController');

// router.post('/create', OrderController.createOrder);
// router.delete('/:id', OrderController.deleteOrder);
// router.get('/:id', OrderController.getOrder);
// router.get('/', OrderController.getAllOrders);
// router.put('/:id/status', OrderController.updateOrderStatus);

// module.exports = router;


const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/OrderController');

// Public route (guest or user checkout)
router.post('/', OrderController.createOrder);

// Admin/User routes
router.get('/', OrderController.getAllOrders);
router.get('/:id', OrderController.getOrderById);
router.put('/:id/status', OrderController.updateOrderStatus);
router.delete('/:id', OrderController.deleteOrder);

module.exports = router;
