const { Sales, User, SaleProduct, Product } = require('../../database/models');
const { mapError } = require('../helpers/mapErrors');

const getSeller = async () => {
  const result = await User.findAll({ where: { role: 'seller' } });
  return result;
};

const getOrders = async (email) => {
  const { id } = await User.findOne({ where: { email } });
  const orders = await Sales.findAll({ where: { sellerId: id } });
  if (!orders) return mapError('Not found');
  return orders;
};

const getOrdersById = async (email, orderId) => {
  const { id } = await User.findOne({ where: { email } });
  const orders = await Sales.findOne({ where: { id: orderId },
  include: [
    { model: SaleProduct, as: 'SaleProduct', include: { model: Product, as: 'Products' } },
  ],
  });
  if (!orders) return mapError('Not found');
  if (Number(orders.dataValues.sellerId) !== id) return mapError('Not Allowed'); 
  return orders;
};

const changeStatusById = async (email, orderId, status) => {
  const orders = await Sales.update({ status }, { where: { id: orderId } });
  if (!orders) return mapError('Not found');
};

module.exports = {
  getOrders,
  getSeller,
  getOrdersById,
  changeStatusById,
};
