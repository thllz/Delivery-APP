const { Op } = require('sequelize');
const md5 = require('md5');
const { User, Product } = require('../../database/models');
const { mapError } = require('../helpers/mapErrors');

const register = async ({ name, email, password, role }) => {
  const encodePass = md5(password);

  const isValidUser = await User.findOne({ where: { email } });
  if (isValidUser) return mapError('Conflict');

  const result = await User.create({ name, email, password: encodePass, role });
  return result;
};

const findAll = async () => {
  const users = await User.findAll({
    where: { role: { [Op.ne]: 'administrator' } },
  });
  return users;
};

const deleteUser = async (id) => {
  const users = await User.destroy({ where: { id } });
  return users;
};

const updateProduct = async (id, name, price, url) => {
  const findProduct = await Product.findOne({ where: { id } });
  if (!findProduct) return mapError('Product not found');
  const update = await Product.update(
    { name, price, urlImage: url },
    { where: { id } },
  );
  return update;
};

const deleteProduct = async (id) => {
  const product = await Product.destroy({ where: { id } });
  return product;
};

const addNewProduct = async (name, price, url) => {
  const findProduct = await Product.findOne({ where: { name } });
  if (findProduct !== null) return mapError('Product already exists');
  // const priceNum = Number(price);
  const insert = await Product.create(
    { name, price, urlImage: url },
  );
  return insert;
};

module.exports = {
  register,
  findAll,
  deleteUser,
  updateProduct,
  deleteProduct,
  addNewProduct,
};