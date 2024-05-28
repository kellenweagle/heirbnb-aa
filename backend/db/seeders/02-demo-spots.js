'use strict';

const { DESCRIBE } = require('sequelize/lib/query-types');
const { Spot } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      await Spot.bulkCreate([
        {
          ownerId: 1,
          address: "123 Home St",
          city: "San Francisco",
          state: "California",
          country: "United States of America",
          lat: 37.7645358,
          lng: -122.4730327,
          name: "It a home",
          description: "This is where you can stay!",
          price: 500
        },{
          ownerId: 2,
          address: "456 Home St",
          city: "Santa Cruz",
          state: "California",
          country: "United States of America",
          lat: 12.7645358,
          lng: -170.4730327,
          name: "This is a home",
          description: "Wow a home!",
          price: 1000
        },{
          ownerId: 3,
          address: "789 Home St",
          city: "San Jose",
          state: "California",
          country: "United States of America",
          lat: 13.7645358,
          lng: -124.4730327,
          name: "A home!",
          description: "This is where you can visit!",
          price: 1500
        },
        {
          ownerId: 4,
          address: "123 Home Blvd",
          city: "San Francisco",
          state: "California",
          country: "United States of America",
          lat: 37.7645358,
          lng: -122.4730327,
          name: "A nice home",
          description: "This place is a home!",
          price: 200
        }
        ,
        {
          ownerId: 5,
          address: "123 Blue Blvd",
          city: "San Francisco",
          state: "California",
          country: "United States of America",
          lat: 37.7645358,
          lng: -122.4730327,
          name: "A nice blue home",
          description: "This place is a blue home!",
          price: 200
        },
        {
          ownerId: 6,
          address: "123 Smart Blvd",
          city: "San Francisco",
          state: "California",
          country: "United States of America",
          lat: 37.7645358,
          lng: -122.4730327,
          name: "A smart home",
          description: "This place is a smart home!",
          price: 200
        }
      ])
    } catch (e) {
      console.error(e)
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Spot', null, {})
  }
    
}
