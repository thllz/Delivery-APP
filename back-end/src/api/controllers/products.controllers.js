const productsService = require('../services/sale_products.services');

const findAll = async (_req, res) => {
  const service = await productsService.findAll();

  if (service.errorCode) return res.status(service.errorCode).json({ message: service.message });

  return res.status(200).json(service);
};

module.exports = {
  findAll,
};