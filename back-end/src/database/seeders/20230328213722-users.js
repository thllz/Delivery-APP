/* eslint-disable max-lines-per-function */
// 'use strict';

module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        id: 1,
        name: 'Delivery App Admin',
        email: 'adm@deliveryapp.com',
        password: 'a4c86edecc5aee06eff8fdeda69e0d04',
        role: 'administrator',
      },
      {
        id: 2,
        name: 'Fulana Pereira',
        email: 'fulana@deliveryapp.com',
        password: '3c28d2b0881bf46457a853e0b07531c6',
        role: 'seller',
      },
      {
        id: 3,
        name: 'Cliente Zé Birita',
        email: 'zebirita@email.com',
        password: '1c37466c159755ce1fa181bd247cb925',
        role: 'customer',
      },
      {
        id: 4,
        name: 'Admin',
        email: 'a@a.com',
        password: '4297f44b13955235245b2497399d7a93',
        role: 'administrator',
      },
      {
        id: 5,
        name: 'Seller',
        email: 's@s.com',
        password: '4297f44b13955235245b2497399d7a93',
        role: 'seller',
      },
      {
        id: 6,
        name: 'Zé Birita',
        email: 'c@c.com',
        password: '4297f44b13955235245b2497399d7a93',
        role: 'customer',
      },
    ]);
  },
  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
