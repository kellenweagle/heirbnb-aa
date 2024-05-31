// backend/routes/api/bookings.js
const express = require('express');

const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const CustomError = require('../../errors/errors')


const { Spot, User, Review, ReviewImage, SpotImage, Booking } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

const validateBookings = [
  check('endDate'),
  handleValidationErrors
]

function dateFormatter(date) {
  const time = new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const formattedTime = time.format(date).split(' ')[0];
  const createdOrUpdatedAt = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${formattedTime}`;

  return createdOrUpdatedAt
}


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

    let formattedResult = []

    for(let booking of bookings) {

      const spot = await Spot.findByPk(booking.spotId);

      const spotImages = await SpotImage.findAll({
        where: {
          spotId: spot.id
        }
      })

      let preview = ""

      for(let spotImage of spotImages) {
        if(spotImage.preview === true) {
          preview += spotImage.url
        }
      }

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
              "previewImage": preview
            },
            "userId": user.id,
            "startDate": dateFormatter(booking.startDate).split(" ")[0],
            "endDate": dateFormatter(booking.endDate).split(" ")[0],
            "createdAt": dateFormatter(booking.createdAt),
            "updatedAt": dateFormatter(booking.updatedAt)
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
router.put('/:bookingId', requireAuth, validateBookings, async(req, res, next) => {
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

    if(dateFormatter(bookingToUpdate.startDate) > dateFormatter(bookingToUpdate.endDate)) {
      const error = new CustomError("Past bookings can't be modified", 403);
      throw error
    }

    await bookingToUpdate.update({
      startDate,
      endDate
    })

    res.json({
      "id": bookingToUpdate.id,
      "spotId": bookingToUpdate.spotId,
      "userId": bookingToUpdate.userId,
      "startDate": dateFormatter(bookingToUpdate.startDate).split(" ")[0],
      "endDate": dateFormatter(bookingToUpdate.endDate).split(" ")[0],
      "createdAt": dateFormatter(bookingToUpdate.createdAt),
      "updatedAt": dateFormatter(bookingToUpdate.updatedAt)
    })

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

    const date = new Date();
    const createdOrUpdatedAt = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()};`

    if(createdOrUpdatedAt > bookingToDelete.startDate) {
      const error = new CustomError ("Bookings that have been started can't be deleted", 403);
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