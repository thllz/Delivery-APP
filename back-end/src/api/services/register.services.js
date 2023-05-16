const md5 = require('md5');
const { User } = require('../../database/models');
const { mapError } = require('../helpers/mapErrors');

const register = async ({ name, email, password }) => {
  const encodedPassword = md5(password);
  const isValidUser = await User.findOne({ where: { email } });
  if (isValidUser) return mapError('Conflict');

  const result = await User.create({ name, email, password: encodedPassword, role: 'customer' });
  return result;
};

module.exports = {
  register,
};