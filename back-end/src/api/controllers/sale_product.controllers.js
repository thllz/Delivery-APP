const service = require('../services/product.services');

const getAll = async (req, res) => {
  const result = await service.getAll();
  const palavras = result.map((e) => ({
    saleId: e.id,
    sellerId: e.sellerId,
    totalPrice: e.totalPrice,
    deliveryAddress: e.deliveryAddress,
    deliveryNumber: e.deliveryNumber,
    saleDate: e.saleDate,
    status: e.status,
    products: e.SaleProduct.map((h) => ({
      id: h.productId,
      name: h.Products.name,
      price: h.Products.price,
      quantity: h.quantity,
    })),
  }));
  return res.status(201).json(palavras);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await service.getById(id);
  return res.status(200).json(result);
};

const createSale = async (req, res) => {
  const { sale, products } = req.body;
  const result = await service.createSale(sale, products);
  return res.status(201).json(result);
};

module.exports = {
  getAll,
  getById,
  createSale,
};

// [
//   {
//     "id": 1,
//     "userId": 3,
//     "sellerId": 2,
//     "totalPrice": "22.47",
//     "deliveryAddress": "Rua Piruleta",
//     "deliveryNumber": "2633",
//     "saleDate": "2023-03-30T23:53:42.000Z",
//     "status": "3",
//     "SaleProduct": [
//       {
//         "saleId": 1,
//         "productId": 4,
//         "quantity": 2,
//         "Products": {
//           "id": 4,
//           "name": "Brahma 600ml",
//           "price": "7.50",
//           "urlImage": "http://localhost:3001/images/brahma_600ml.jpg"
//         }
//       },
//       {
//         "saleId": 1,
//         "productId": 3,
//         "quantity": 3,
//         "Products": {
//           "id": 3,
//           "name": "Antarctica Pilsen 300ml",
//           "price": "2.49",
//           "urlImage": "http://localhost:3001/images/antarctica_pilsen_300ml.jpg"
//         }
//       }
//     ]
//   },
//   {
//     "id": 2,
//     "userId": 3,
//     "sellerId": 2,
//     "totalPrice": "6.60",
//     "deliveryAddress": "Rua do Chico Butico",
//     "deliveryNumber": "734",
//     "saleDate": "2023-03-31T01:06:21.000Z",
//     "status": "2",
//     "SaleProduct": []
//   }
// ]
