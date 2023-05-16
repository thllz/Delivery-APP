const express = require('express');

const ordersController = require('../controllers/orders.controllers');

const router = express.Router();

router.get('/orders', ordersController.getOrders);

module.exports = router;