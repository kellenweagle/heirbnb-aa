'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Bookings', [
      {
       userId: 1,
       spotId: 2,
       startDate: "2024-06-20",
       endDate: "2024-07-20"
     },
     {
      userId: 2,
      spotId: 3,
      startDate: "2024-06-20",
      endDate: "2024-07-20"
    },
    {
      userId: 3,
      spotId: 4,
      startDate: "2024-06-20",
      endDate: "2024-07-20"
    },
    {
      userId: 4,
      spotId: 5,
      startDate: "2024-06-20",
      endDate: "2024-07-20"
    },
    {
      userId: 5,
      spotId: 6,
      startDate: "2024-06-20",
      endDate: "2024-07-20"
    },
    ], {});
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Bookings', null, {});
  }
};
