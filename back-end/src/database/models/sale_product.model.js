/* eslint-disable max-lines-per-function */
module.exports = (sequelize, DataTypes) => {
  const SaleProduct = sequelize.define('SaleProduct', {
    saleId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },

    productId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },

    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

  }, {
    timestamps: false,
    tableName: 'sales_products',
    underscored: true,
  });

  SaleProduct.associate = ({ Sales, Product }) => {
    SaleProduct.belongsTo(Sales, {
      as: 'Sales',
      foreignKey: 'saleId',
    });
    SaleProduct.belongsTo(Product, {
      as: 'Products',
      foreignKey: 'productId',
    });
  };

  return SaleProduct;
};
