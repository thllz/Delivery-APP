const express = require('express');

const controller = require('../controllers/sale_product.controllers');
const { verifyToken } = require('../middlewares/jwtVerify');

const router = express.Router();

router.get('/orders', controller.getAll);

router.post('/orders', verifyToken, controller.createSale);

router.get('/orders/:id', controller.getById);

module.exports = router;