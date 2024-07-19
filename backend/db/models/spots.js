'use strict';
const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    static associate(models) {
      Spot.belongsTo(models.User, {
        foreignKey: 'ownerId',
        as: "Owner",
        onDelete: "CASCADE"
      });

      Spot.hasMany(models.Review, {
        foreignKey: 'spotId'
      })

      Spot.hasMany(models.SpotImage, {
        foreignKey: "spotId"
      })

      Spot.hasMany(models.Booking, {
        foreignKey: "spotId"
      })
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
        len: [1, 50]
      }
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 30]
      }
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 50]
      }
    },
    lat: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    lng: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [1, 50]
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 500]
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
