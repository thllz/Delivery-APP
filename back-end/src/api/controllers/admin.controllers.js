const adminService = require('../services/admin.services');

const adminRegister = async (req, res) => {
  const service = await adminService.register(req.body);
  if (service.errorCode) return res.status(service.errorCode).json({ message: service.message });

  return res.status(201).json('Created');
};

const getUsers = async (_req, res) => {
  const service = await adminService.findAll();
  return res.status(201).json(service);
};

const deleteUser = async (req, res) => {
  const { userid } = req.headers;
  const service = await adminService.deleteUser(+userid);
  return res.status(201).json(service);
};

const updateProduct = async (req, res) => {
  const { id, name, price, url } = req.body;
  const service = await adminService.updateProduct(id, name, price, url);
  if (service.errorCode) return res.status(service.errorCode).json({ message: service.message });

  return res.status(200).json(service);
};

const deleteProduct = async (req, res) => {
  const { idtodelete } = req.headers;
  const service = await adminService.deleteProduct(idtodelete);
  if (service.errorCode) return res.status(service.errorCode).json({ message: service.message });

  return res.status(200).send();
};

const addNewProduct = async (req, res) => {
  const { name, price, url } = req.body;
  const service = await adminService.addNewProduct(name, price, url);
  if (service.errorCode) return res.status(service.errorCode).json({ message: service.message });

  return res.status(200).json(service);
};

module.exports = {
  adminRegister,
  getUsers,
  deleteUser,
  updateProduct,
  deleteProduct,
  addNewProduct,
};