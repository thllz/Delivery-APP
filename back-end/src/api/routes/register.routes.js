const express = require('express');

const registerController = require('../controllers/register.controllers');

const registerRoutes = express.Router();

registerRoutes.post('/', registerController.register);

module.exports = registerRoutes;