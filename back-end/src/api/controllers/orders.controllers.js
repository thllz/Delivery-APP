const jwt = require('jsonwebtoken');
const secret = require('../../utils/secret');
const ordersService = require('../services/orders.services');

const getOrders = async (req, res) => {
  const token = req.headers.authorization;
  const { email } = jwt.verify(token, secret);

  const orders = await ordersService.getOrders(email);
  
  if (orders.errorCode) return res.status(orders.errorCode).json({ message: orders.message });

  return res.status(200).json(orders);
};

module.exports = {
  getOrders,
};