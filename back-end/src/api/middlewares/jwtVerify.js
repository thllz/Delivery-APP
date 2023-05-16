const jwt = require('jsonwebtoken');
const secret = require('../../utils/secret');

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  try {
    jwt.verify(token, secret);
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token not found' });
  }
};

const verifyAdminToken = (req, res, next) => {
  const { authorization, role } = req.headers;
  try {
    if (role === 'administrator') {
      jwt.verify(authorization, secret);
      next();
    }
  } catch (error) {
    return res.status(401).json({ message: 'Token not found' });
  }
};

module.exports = { verifyToken, verifyAdminToken };