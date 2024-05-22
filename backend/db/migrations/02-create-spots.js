'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const { now } = require('sequelize/lib/utils');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Spots', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      ownerId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      address: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
      },
      city: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      state: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      country: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      lat: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      lng: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true
      },
      description: {
        type: Sequelize.STRING(250),
        allowNull: false
      },
      price: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      }
    }, options);
  },
  async down(queryInterface, Sequelize) {
    options.tableName = "Spots";
    return queryInterface.dropTable(options);
  }
};