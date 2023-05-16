/* eslint-disable max-lines-per-function */
module.exports = (sequelize, DataTypes) => {
  const Sales = sequelize.define('Sales', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },

    sellerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },

    totalPrice: {
      type: DataTypes.DECIMAL(9, 2),
      allowNull: false,
    },

    deliveryAddress: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    deliveryNumber: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    saleDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  }, {
    timestamps: false,
    tableName: 'sales',
    underscored: true,
  });

  Sales.associate = ({ User, SaleProduct }) => {
    Sales.belongsTo(User, {
      foreignKey: 'userId',
      as: 'users',
    });
    Sales.belongsTo(User, {
      foreignKey: 'sellerId',
      as: 'sellers',
    });
    Sales.hasMany(SaleProduct, {
      as: 'SaleProduct',
      foreignKey: 'saleId',
    });
  };

  return Sales;
};
