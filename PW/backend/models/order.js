'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Usuario, {
        foreignKey: 'UserId',
        as: 'usuario'
      })
      
      this.hasMany(models.OrderItem, {
        foreignKey: 'orderId',
        as: 'items',
      })
    }
  }
  Order.init({
    userId: DataTypes.INTEGER,
    monto: DataTypes.FLOAT,
    fecha: DataTypes.STRING,
    estado: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};