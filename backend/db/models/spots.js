'use strict';
const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    static associate(models) {
      // define association here
    }
  }
  Spot.init({
    address: { 
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [1, 100]
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 50],
        isAlpha: true
      }
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 30],
        isAlpha: true
      }
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 50],
        isAlpha: true
      }
    },
    lat: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    lng: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [1, 50],
        isAlpha: true
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 250]
      }
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Spot'
  });
  return Spot;
};