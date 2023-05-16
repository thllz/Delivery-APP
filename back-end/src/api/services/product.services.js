const Sequelize = require('sequelize');
const { SaleProduct, Product, Sales, User } = require('../../database/models');
const config = require('../../database/config/config');

const env = process.env.NODE_ENV || 'development';

const sequelize = new Sequelize(config[env]);

const getAll = async () => {
  const result = await Sales.findAll({
    include: [
      { model: SaleProduct, as: 'SaleProduct', include: { model: Product, as: 'Products' } },
    ],
  });
  return result;
};

const getById = async (id) => {
  const result = await Sales.findOne({ 
    where: { id },
    include: [
      { model: SaleProduct, as: 'SaleProduct', include: { model: Product, as: 'Products' } },
      { model: User, as: 'sellers' },
    ],
  });
  return result;
};

// const getById = async (id) => {
//   const result = await Sales.findOne({ 
//     where: { id },
//     include: [
//       { model: SaleProduct, as: 'SaleProduct', include: { model: Product, as: 'Products' } },
//     ],
//   });
//   return result;
// };

const createSale = async (sale, products) => {
  try {
    const result = sequelize.transaction(async (t) => {
      const newSale = await Sales.create(sale, { transaction: t });
      const newSaleProduct = products.map(
        (e) => ({ saleId: newSale.id, productId: e.id, quantity: e.qty }),
);
      await SaleProduct.bulkCreate(newSaleProduct, { transaction: t });
      return newSale;
  });
    return result;
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
    getAll,
    getById,
    createSale,
};

// {
//   "sale":{
//     "userId":3,
//     "sellerId":2,
//     "totalPrice":35.74,
//     "deliveryAddress":"Rua do Arthur Morgan",
//     "deliveryNumber":4558,
//     "sale_date":"now()",
//     "status":2
//   },
//   "products":[
//     {
//     "productId":6,
//     "quantity":4
//   },
//   {
//     "productId":9,
//     "quantity":2
//   }]
// }
