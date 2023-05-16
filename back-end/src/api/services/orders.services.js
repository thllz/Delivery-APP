const { Sales, User } = require('../../database/models');
const { mapError } = require('../helpers/mapErrors');

const getOrders = async (email) => {
  const { id } = await User.findOne({ where: { email } });
  const orders = await Sales.findAll({ where: { sellerId: id } });
  if (!orders) return mapError('Not found');
  return orders;
};

module.exports = {
  getOrders,
};