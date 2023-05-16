const express = require('express');

const sellerController = require('../controllers/seller.controllers');

const router = express.Router();

router.get('/', sellerController.getSeller);

router.get('/orders', sellerController.getOrders);

router.get('/orders/:id', sellerController.getOrdersById);

router.patch('/orders/:id', sellerController.changeStatusById);

module.exports = router;
