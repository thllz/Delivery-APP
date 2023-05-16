const express = require('express');

const adminController = require('../controllers/admin.controllers');
const { verifyAdminToken } = require('../middlewares/jwtVerify');

const adminRouter = express.Router();

adminRouter.post('/register', verifyAdminToken, adminController.adminRegister);

adminRouter.get('/users', verifyAdminToken, adminController.getUsers);

adminRouter.delete('/users', verifyAdminToken, adminController.deleteUser);

adminRouter.patch('/manage/products', verifyAdminToken, adminController.updateProduct);

adminRouter.delete('/manage/products', verifyAdminToken, adminController.deleteProduct);

adminRouter.put('/manage/product', verifyAdminToken, adminController.addNewProduct);

module.exports = adminRouter;