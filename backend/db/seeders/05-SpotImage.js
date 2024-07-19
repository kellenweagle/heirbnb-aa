'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
options.tableName = "SpotImages";

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert(options, [
       { spotId: 1, url: "https://static.vecteezy.com/system/resources/thumbnails/023/308/330/small_2x/ai-generative-exterior-of-modern-luxury-house-with-garden-and-beautiful-sky-photo.jpg", preview: true},
       { spotId: 2, url: "https://hips.hearstapps.com/ghk.h-cdn.co/assets/16/38/320x240/sd-aspect-1474484340-screen-shot-2016-09-21-at-25702-pm.png?resize=1200:*", preview: true},
       { spotId: 3, url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRbcrj53mGyk-u4JwrIb6z1RBAeCpxR78gfQ&s", preview: true},
       { spotId: 4, url: "https://www.bhg.com/thmb/H9VV9JNnKl-H1faFXnPlQfNprYw=/1799x0/filters:no_upscale():strip_icc()/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg", preview: true},
       { spotId: 5, url: "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500", preview: true},
     {
      spotId: 6,
       url: "https://www.cheapoldhouses.com/wp-content/uploads/2024/03/cheapish-hero-shot.jpeg",
      preview: true
     }
    ], {});

  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete(options, null, {});
  }
};
