'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Carrito extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Carrito.belongsTo(models.Usuario, {
        foreignKey: 'usuarioId',
        as: 'usuario',
      })

      Carrito.belongsTo(models.Producto, {
        foreignKey: 'productoId',
        as: 'producto',
      });
    }
  }
  Carrito.init({
    usuarioId: DataTypes.INTEGER,
    productoId: DataTypes.INTEGER,
    cantidad: DataTypes.INTEGER,
    talla: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Carrito',
    tableName: 'Carrito',
    freezeTableName: true
  });
  return Carrito;
};