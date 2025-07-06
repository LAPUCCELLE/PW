'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Order, {
        foreignKey: 'orderId',
        as: 'orden'
      });

      this.belongsTo(models.Producto, {
        foreignKey: 'productoId',
        as: 'producto'
      });
    }
  }
  OrderItem.init({
    orderId: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'orderId',
      references: {
        model: 'Orders',
        key: 'id'
      }
    },
    productoId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { 
        min: 1, 
        isInt: true
      }
    },
    precioUnit: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
        isFloat: true
      }
    },
    talla: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1,10]
      }
    } 
  }, {
    sequelize,
    modelName: 'OrderItem',
    tableName: 'OrderItems',
    freezeTableName: true 
  });
  return OrderItem;
};