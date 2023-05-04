'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tags extends Model {
    
    static associate(models) {
      // define association here
    }
  }
  Tags.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Tags',
    paranoid:true
  });
  return Tags;
};