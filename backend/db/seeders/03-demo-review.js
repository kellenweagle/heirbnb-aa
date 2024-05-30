'use strict';

const { Review } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      await Review.bulkCreate([
        {
          userId: 1,
          spotId: 1,
          review: "This was a nice spot!",
          stars: 4
        },
        {
          userId: 3,
          spotId: 1,
          review: "I really enjoyed my time here!",
          stars: 5
        },
        {
          userId: 1,
          spotId: 2,
          review: "I really liked it here!",
          stars: 5
        },
        {
          userId: 4,
          spotId: 2,
          review: "I really liked it here!",
          stars: 4
        },
        {
          userId: 1,
          spotId: 3,
          review: "I really liked it here!",
          stars: 3
        },
        {
          userId: 4,
          spotId: 3,
          review: "I really liked it here!",
          stars: 2
        },
        {
          userId: 1,
          spotId: 4,
          review: "Not great",
          stars: 1
        },
        {
          userId: 2,
          spotId: 4,
          review: "Stinky",
          stars: 1
        },
        {
          userId: 1,
          spotId: 5,
          review: "I really liked it here!",
          stars: 5
        },
        {
          userId: 4,
          spotId: 5,
          review: "I really liked it here!",
          stars: 5
        },
        {
          userId: 1,
          spotId: 6,
          review: "It was okay",
          stars: 2
        },
        {
          userId: 3,
          spotId: 6,
          review: "Im not impressed",
          stars: 3
        }
      ])
    } catch(e) {
      console.error(e)
    }
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
