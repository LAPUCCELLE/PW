'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Producto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Usuario, {
        foreignKey: 'usuarioId',
        as: 'usuario'
      })
      
    }
  }
  Producto.init({
    nombre: DataTypes.STRING,
    precio: DataTypes.FLOAT,
    categoria: DataTypes.STRING,
    color: DataTypes.STRING,
    talla: DataTypes.ARRAY,
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