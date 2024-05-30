'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
options.tableName = "SpotImages";

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('SpotImages', [
      {
      spotId: 1,
      url: "https://wallpapers.com/images/high/nice-house-pictures-wiwo3snr72rar3h6.webp",
      preview: true
     },
     {
      spotId: 2,
      url: "https://wallpapers.com/images/high/nice-house-pictures-sm570gfmq3kzppe9.webp",
      preview: true
     },
     {
      spotId: 3,
      url: "https://wallpapers.com/images/high/nice-house-pictures-rkiq4gicfqmly8m8.webp",
      preview: true
     },
     {
      spotId: 4,
      url: "https://wallpapers.com/images/high/nice-house-pictures-xsi144na4lpb4iwc.webp",
      preview: true
     },
     {
      spotId: 5,
      url: "https://wallpapers.com/images/high/nice-house-pictures-wwdf2thpzwknh67p.webp",
      preview: true
     },
     {
      spotId: 6,
      url: "https://wallpapers.com/picture/nice-house-pictures-0320xbbaesfgjtin.html",
      preview: true
     }
    ], {});
 
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('SpotImages', null, {});
  }
};
