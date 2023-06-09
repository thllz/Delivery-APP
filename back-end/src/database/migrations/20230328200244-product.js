/* eslint-disable camelcase */
/* eslint-disable max-lines-per-function */
// 'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },

      price: {
        type: Sequelize.DECIMAL(4, 2),
        allowNull: false,
      },

      url_image: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
    });
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('products');
  },
};
