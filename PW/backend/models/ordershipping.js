'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderShipping extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      OrderShipping.belongsTo(models.Order, {foreignKey:'orderId'});
    }
  }
  
  OrderShipping.init({
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "orderId",
      references: {
        model: "Orders", // Relacionado con la tabla Orders
        key: 'id',
      },

    },
    departamento: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    provincia: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    distrito: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    metodoEnvio: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'OrderShipping',
    tableName: 'OrderShippings',
    freezeTableName: true 
  });
  return OrderShipping;
};