const jwt = require('jsonwebtoken');
const { createHmac } = require('crypto');
const secret = require('./secret');

const encode = (data) => {
  const md5Hasher = createHmac('md5', secret || 'secret_key');
  return md5Hasher.update(data).digest('hex');
};

const signToken = (payload) => {
  const token = jwt.sign(payload, secret);
  return token;
};

module.exports = { encode, signToken };
