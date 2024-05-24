// backend/routes/api/spots.js
const express = require('express');

const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { Spot } = require('../../db/models');

const router = express.Router();

const validateSpot = [
  check('address')
  .exists({ checkFalsy: true })
  .withMessage('Street address is required'),
check('city')
  .exists({ checkFalsy: true })
  .withMessage('City is required'),
check('state')
  .exists({ checkFalsy: true })
  .withMessage('State is required'),
check('country')
  .exists({ checkFalsy: true })
  .withMessage('Country is required'),
check('lat')
  .exists({ checkFalsy: true })
  .withMessage('Latitude is not valid'),
check('lng')
  .exists({ checkFalsy: true })
  .withMessage('Longitude is not valid'),
check('name')
  .exists({ checkFalsy: true })
  .isLength({ max: 50 })
  .withMessage('Name must be less than 50 characters'),
check('description')
  .exists({ checkFalsy: true })
  .withMessage('Description is required'),
check('price')
  .exists({ checkFalsy: true })
  .withMessage('Price per day is required'),
  handleValidationErrors
];

router.get('/', async(req, res, next) => {
  try {

    const spots = await Spot.findAll()

    let spotArr = []

    for(let spot of spots) {
      spotArr.push({
        id: spot.id,
        ownerId: spot.id,
        address: spot.address,
        city: spot.city,
        state: spot.state,
        country: spot.country,
        lat: spot.lat,
        lng: spot.lng,
        name: spot.name,
        description: spot.description,
        price: spot.price,
        createdAt: spot.createdAt,
        updatedAt: spot.updatedAt
      })
    }
    res.json({Spots: spotArr})
  } catch (e) {
    next (e)
  }
})

module.exports = router;