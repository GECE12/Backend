'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('actions',
      [{id:1, nombre: 'Ejecutar', createdAt: new Date(), updatedAt: new Date()},
      {id:2, nombre: 'Borrar', createdAt: new Date(), updatedAt: new Date()},
      {id:3, nombre: 'Insertar', createdAt: new Date(), updatedAt: new Date()}], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('actions', null, {});
  }
};
