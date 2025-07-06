'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Producto extends Model {
    static associate(models) {
      this.hasMany(models.OrderItem, {
        foreignKey: 'productoId',
        as: 'ordenItems'
      });
    }
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

  }
  Producto.init({
    nombre: DataTypes.STRING,
    precio: DataTypes.FLOAT,
    categoria: DataTypes.STRING,
    color: DataTypes.STRING,
    talla: DataTypes.ARRAY(DataTypes.STRING),
    tipo: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    imagenMain: DataTypes.STRING,
    imagen1: DataTypes.STRING,
    imagen2: DataTypes.STRING,
    imagen3: DataTypes.STRING,
    descripcion: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Producto',
  });
  return Producto;
};