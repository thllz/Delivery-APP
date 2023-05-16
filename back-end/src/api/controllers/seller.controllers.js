const jwt = require('jsonwebtoken');
const sellerServices = require('../services/seller.services');
const secret = require('../../utils/secret');

const getSeller = async (req, res) => {
  const service = await sellerServices.getSeller();
  return res.status(200).json(service);
};

const getOrders = async (req, res) => {
  const token = req.headers.authorization;
  const { email } = jwt.verify(token, secret);

  const orders = await sellerServices.getOrders(email);
  if (orders.errorCode) return res.status(orders.errorCode).json({ message: orders.message });

  return res.status(200).json(orders);
};

const getOrdersById = async (req, res) => {
  const token = req.headers.authorization;
  const { id } = req.params;
  const { email } = jwt.verify(token, secret);

  const orders = await sellerServices.getOrdersById(email, id);

  if (orders.errorCode) return res.status(orders.errorCode).json({ message: orders.message });

  return res.status(200).json(orders);
};

const changeStatusById = async (req, res) => {
  const token = req.headers.authorization;
  const { id } = req.params;
  const { email } = jwt.verify(token, secret);
  const { status } = req.body;
  await sellerServices.changeStatusById(email, id, status);

  return res.status(204).json('');
};

module.exports = {
  getOrders,
  getSeller,
  getOrdersById,
  changeStatusById,
};
