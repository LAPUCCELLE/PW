'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Productos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING
      },
      precio: {
        type: Sequelize.FLOAT
      },
      categoria: {
        type: Sequelize.STRING
      },
      color: {
        type: Sequelize.STRING
      },
      talla: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      tipo: {
        type: Sequelize.STRING
      },
      stock: {
        type: Sequelize.INTEGER
      },
      imagenMain: {
        type: Sequelize.STRING
      },
      imagen1: {
        type: Sequelize.STRING
      },
      imagen2: {
        type: Sequelize.STRING
      },
      imagen3: {
        type: Sequelize.STRING
      },
      descripcion: {
        type: Sequelize.STRING
      },
      usuarioId: {
        type: Sequelize.INTEGER,
        references : {
          model: 'Usuarios',
          key:'id'
        },
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Productos');
  }
};