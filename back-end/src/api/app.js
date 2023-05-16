const express = require('express');
const cors = require('cors');
const { login, register, saleProduct, products, seller, admin } = require('./routes');

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.static(`${__dirname}/../../public`));

app.use('/login', login);
app.use('/register', register);
app.use('/products', products);
app.use('/seller', seller);
app.use('/customer', saleProduct);
app.use('/admin', admin);

module.exports = app;
