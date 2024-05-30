// backend/routes/api/bookings.js
const express = require('express');

const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const CustomError = require('../../errors/errors')


const { Spot, User, Review, ReviewImage, Booking } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

// get all of the current user's bookings
router.get('/current', requireAuth, async(req, res, next) => {
  try {

    const { user } = req;

    if(!user) {
      const error = new CustomError ("Forbidden", 403);
      throw error
    }

    const bookings = await Booking.findAll({
      where: {userId: user.id},
      include: [
        {model: Spot, attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price']},
      ]
    });

    const date = new Date();
    const time = new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const formattedTime = time.format(date).split(' ')[0];
    const createdOrUpdatedAt = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${formattedTime}`;

    let formattedResult = []

    for(let booking of bookings) {

      const spot = await Spot.findByPk(booking.spotId);

      
      const startDate = new Date(booking.startDate);
      const endDate = new Date(booking.endDate)

      console.log(startDate, endDate)

      formattedResult.push(
          {
            "id": booking.id,
            "spotId": booking.spotId,
            "Spot": {
              "id": spot.id,
              "ownerId": spot.ownerId,
              "address": spot.address,
              "city": spot.city,
              "state": spot.state,
              "country": spot.country,
              "lat": spot.lat,
              "lng": spot.lng,
              "name": spot.name,
              "price": spot.price,
              "previewImage": spot.previewImage
            },
            "userId": user.id,
            "startDate": startDate,
            "endDate": endDate,
            "createdAt": createdOrUpdatedAt,
            "updatedAt": createdOrUpdatedAt
          })
      res.json({
        "Bookings": formattedResult
      })
    }

  } catch(e) {
    next(e)
  }
});

// update a booking
router.put('/:bookingId', requireAuth, async(req, res, next) => {
  try {

    const {startDate, endDate} = req.body;
 
    const { user } = req;
    const id = req.params.bookingId

    const bookingToUpdate = await Booking.findByPk(id)

    if(!bookingToUpdate) {
      const error = new CustomError("Booking couldn't be found", 404);
      throw error
    }

    if(user.id !== bookingToUpdate.userId) {
      const error = new CustomError ("Forbidden", 403);
      throw error
    }

    const updatedBooking = await bookingToUpdate.update({
      startDate,
      endDate
    })

    res.json(updatedBooking)

  } catch(e) {
    next(e)
  }
})

// delete a booking
router.delete('/:bookingId', requireAuth, async(req, res, next) => {
  try {

    const { user } = req
    const id = req.params.bookingId;

    const bookingToDelete = await Booking.findByPk(id);

    if(!bookingToDelete) {
      const error = new CustomError("Booking couldn't be found", 404);
      throw error
    };

    if(user.id !== bookingToDelete.userId) {
      const error = new CustomError ("Forbidden", 403);
      throw error
    }

    await bookingToDelete.destroy()

    res.json({
      message: "Successfully deleted"
    })

  } catch(e) {
    next(e)
  }
})

module.exports = router;