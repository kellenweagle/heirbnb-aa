'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Bookings', [
      {
       userId: 1,
       spotId: 2,
       startDate: "06-20-2024",
       endDate: "07-20-2024"
     },
     {
      userId: 2,
      spotId: 3,
      startDate: "06-20-2024",
      endDate: "07-20-2024"
    },
    {
      userId: 3,
      spotId: 4,
      startDate: "06-20-2024",
      endDate: "07-20-2024"
    },
    {
      userId: 4,
      spotId: 5,
      startDate: "06-20-2024",
      endDate: "07-20-2024"
    },
    {
      userId: 5,
      spotId: 6,
      startDate: "06-20-2024",
      endDate: "07-20-2024"
    },
    ], { validate: true });
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Bookings', null, {});
  }
};
