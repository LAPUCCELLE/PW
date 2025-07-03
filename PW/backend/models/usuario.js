'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models){
      this.hasMany(models.Order, {
        foreignKey: 'userId',
        as: 'ordenes'
      })

      this.hasMany(models.Carrito, {
        foreignKey: 'usuarioId',
        as: 'carrito',
      })
    }

  }
  Usuario.init({
    nombre: DataTypes.STRING,
    correo: DataTypes.STRING,
    password: DataTypes.STRING,
    rol: DataTypes.STRING,
    genero: DataTypes.STRING,
    fechaRegistro: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Usuario',
  });
  return Usuario;
};