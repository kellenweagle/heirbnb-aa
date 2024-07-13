'use strict';

const { DESCRIBE } = require('sequelize/lib/query-types');
const { Spot } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
options.tableName = "Spots";

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
          address: "123 Miami Home St",
          city: "Miama",
          state: "Florida",
          country: "United States of America",
          lat: 37.7645358,
          lng: -122.4730327,
          name: "Dreamy Miami Hideaway",
          description: "Experience Miami like a local as you unwind in our bright, fresh, and cozy guesthouse. Centrally situated, embrace the city's good vibes and indulge in the comfort of the natural sunlight and our plush bedding—because relaxation is our specialty!",
          price: 118
        },{
          ownerId: 1,
          address: "456 Florida Oasis Way",
          city: "Pompano Beach",
          state: "Florida",
          country: "United States of America",
          lat: 12.7645358,
          lng: -170.4730327,
          name: "Floasis",
          description: "Kick back, relax and recharge in this calm stylish space! Floasis is located 1.3 miles from the beach, with lots of activities, restaurants and shops nearby... but honestly, once you get to the house you won't want to leave! You will have your own good size pool, a hot tub, a covered deck to relax and dine and a big grassy area for the kids or dogs to run, or for yoga, relaxation and just soaking in the florida weather! It's the perfect oasis for a couple, a small family, or 2 couples!",
          price: 287
        },{
          ownerId: 1,
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
          ownerId: 1,
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
          ownerId: 1,
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
          ownerId: 2,
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
      ], { validate: true })
    } catch (e) {
      console.error(e)
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(options, null, {})
  }
    
}
