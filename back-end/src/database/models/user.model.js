/* eslint-disable max-lines-per-function */
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, allowNull: false },
  }, {
    timestamps: false,
    tableName: 'users',
    underscored: true,
  });

  User.associate = ({ Sales }) => {
    User.hasMany(Sales, {
      foreignKey: 'userId',
      as: 'users',
    }, {
      foreignKey: 'sellerId',
      as: 'sales',
    });
  };

  return User;
};
