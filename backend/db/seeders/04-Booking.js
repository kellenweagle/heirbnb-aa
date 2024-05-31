'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
options.tableName = "Bookings";

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert(options, [
      {
       userId: 1,
       spotId: 2,
       startDate: new Date('2024-06-01'),
       endDate: new Date('2024-07-01')
     },
     {
      userId: 2,
      spotId: 3,
      startDate: new Date('2024-06-01'),
      endDate: new Date('2024-07-01')
    },
    {
      userId: 3,
      spotId: 4,
      startDate: new Date('2024-06-01'),
      endDate: new Date('2024-07-01')
    },
    {
      userId: 4,
      spotId: 5,
      startDate: new Date('2024-06-01'),
      endDate: new Date('2024-07-01')
    },
    {
      userId: 5,
      spotId: 6,
      startDate: new Date('2024-06-01'),
      endDate: new Date('2024-07-01')
    },
    ], { validate: true });
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(options, null, {});
  }
};
