'use strict';
const socket = require('../realtime/client');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class action extends Model {
   
    static associate(models) {
      // define association here
      action.belongsTo(models.User, {
        as: 'user',
        foreignKey: "userId"
      });
    }
  }
  action.init({
    nombre: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'action',
  });

  action.afterCreate(function(action, options) {
    socket.emit('new_action', action)
  })

  return action;
};