const md5 = require('md5');
const { User } = require('../../database/models');
const { signToken } = require('../../utils/token');
const { mapError } = require('../helpers/mapErrors');

const login = async ({ email, password }) => {
  const passwordCrypter = md5(password);
  const genToken = signToken({ email });
  const findUser = await User.findOne({
    where: { email, password: passwordCrypter },
    attributes: { exclude: ['password'] },
  });

  if (!findUser) return mapError('Not found');

  return { ...findUser.dataValues, token: genToken };
};

const register = async ({ name, email, password }) => {
  const encodedPassword = md5(password);
  const isValidUser = await User.findOne({ where: { email } });
  if (isValidUser) return mapError('Conflict');

  const result = await User.create({ name, email, password: encodedPassword, role: 'customer' });
  return result;
};

module.exports = {
  login,
  register,
};