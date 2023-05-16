const express = require('express');

const productsController = require('../controllers/products.controllers');

const productRouter = express.Router();

productRouter.get('/', productsController.findAll);

module.exports = productRouter;