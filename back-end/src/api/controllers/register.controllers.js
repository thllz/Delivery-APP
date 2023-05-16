const registerService = require('../services/register.services');

const register = async (req, res) => {
  const data = req.body;
  const service = await registerService.register(data);
  if (service.errorCode) return res.status(service.errorCode).json({ message: service.message });
  return res.status(201).json('Created');
};

module.exports = {
  register,
};