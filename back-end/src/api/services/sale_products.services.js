const { Product } = require('../../database/models');
const { mapError } = require('../helpers/mapErrors');

const findAll = async () => {
  const products = await Product.findAll({});

  if (!products) return mapError('Not found');

  return products;
};

module.exports = {
  findAll,
};