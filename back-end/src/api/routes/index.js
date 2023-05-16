const login = require('./login.routes');
const register = require('./register.routes');
const products = require('./products.routes');
const saleProduct = require('./sale_product.routes');
const seller = require('./seller.routes');
const admin = require('./admin.routes');

module.exports = {
    login,
    register,
    saleProduct,
    products,
    seller,
    admin,
};