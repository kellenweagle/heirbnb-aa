'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('ReviewImages', [
      {
       reviewId: 1,
       url: "https://hoangthaodecor.com/vnt_upload/news/06_2018/img1.jpg"
      },
      {
        reviewId: 2,
        url: "https://hoangthaodecor.com/vnt_upload/news/06_2018/img1.jpg"
      },
      {
        reviewId: 3,
        url: "https://hoangthaodecor.com/vnt_upload/news/06_2018/img1.jpg"
      },
      {
        reviewId: 4,
        url: "https://hoangthaodecor.com/vnt_upload/news/06_2018/img1.jpg"
      },
      {
        reviewId: 5,
        url: "https://hoangthaodecor.com/vnt_upload/news/06_2018/img1.jpg"
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('ReviewImages', null, {});
     
  }
};