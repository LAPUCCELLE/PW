'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Usuarios', [
      {
        nombre: 'Admin Master',
        correo: 'admin@ejemplo.com',
        password: 'admin123',
        rol: 'admin',
        genero: 'hombre',
        fechaRegistro: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Ana Lopez',
        correo: 'ana@correo.com',
        password: 'ana456',
        rol: 'usuario',
        genero: 'mujer',
        fechaRegistro: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Carlos Ramírez',
        correo: 'carlos@correo.com',
        password: 'carlos789',
        rol: 'usuario',
        genero: 'hombre',
        fechaRegistro: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
