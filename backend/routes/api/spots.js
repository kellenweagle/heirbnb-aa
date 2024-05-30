// backend/routes/api/spots.js
const express = require('express');

const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const CustomError = require('../../errors/errors')

const { Op } = require('sequelize')

const { Spot, User, Review, ReviewImage, SpotImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

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

const validateQueryParameters = [
  check('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be greater than or equal to 1'),
  check('size')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Size must be greater than or equal to 1'),
  check('minLat')
    .optional()
    .isFloat({ min: -100 })
    .withMessage("Minimum latitude is invalid"),
  check('maxLat')
    .optional()
    .isFloat({ max: 100 })
    .withMessage("Maximum latitude is invalid"),
  check('minLng')
    .optional()
    .isFloat({ min: -100 })
    .withMessage("Minimum longitude is invalid"),
  check('maxLng')
    .optional()
    .isFloat({ max: 100 })
    .withMessage("Maximum longitude is invalid"),
  check('minPrice')
    .optional()
    .isInt({ min: 0 })
    .withMessage("Minimum price must be greater than or equal to 0"),
  check('maxPrice')
    .optional()
    .isInt({ min: 0 })
    .withMessage("Maximum price must be greater than or equal to 0"),
  handleValidationErrors
];

const validateReviews = [
  check('review')
    .exists({ checkFalsy: true })
    .isLength({ min: 1 })
    .withMessage('Review text is required'),
  check('stars')
    .exists({ checkFalsy: true })
    .isFloat({min: 1, max: 5})
    .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
]

// get all spots
router.get('/', validateQueryParameters, async(req, res, next) => {
  try {
    let { page, size, maxLat, minLat, maxLng, minLng, maxPrice, minPrice } = req.query;
    
    page = parseInt(page);
    size = parseInt(size);

    if(!page) page = 1;
    if(!size) size = 20;

    if(size > 20) {
      size = 20;
    };

    if(page > 10) {
      page = 10;
    };

    let where = {};

    // search for prices
    if(minPrice && maxPrice) {
      where.price = { [Op.between]: [minPrice, maxPrice] };
    }

    if(minPrice && !maxPrice) {
      where.price = { [Op.gte]: minPrice };
    }

    if(!minPrice && maxPrice) {
      where.price = { [Op.lte]: maxPrice };
    }

    // search for lat
    if(minLat && maxLat) {
      where.lat = { [Op.between]: [minLat, maxLat] }
    }

    if(minLat && !maxLat) {
      where.lat = { [Op.gte]: minLat }
    }

    if(!minLat && maxLat) {
      where.lat = { [Op.lte]: maxLat }
    }

    // search for lng
    if(minLng && maxLng) {
      where.lat = { [Op.between]: [minLng, maxLng] }
    }

    if(minLng && !maxLng) {
      where.lat = { [Op.gte]: minLng }
    }

    if(!minLng && maxLng) {
      where.lat = { [Op.lte]: maxLng }
    }


    const spots = await Spot.findAll({
      where,
      limit: size,
      offset: parseInt((page - 1) * size)
    });

    let spotArr = [];

    for(let spot of spots) {
      spotArr.push({
        id: spot.id,
        ownerId: spot.ownerId,
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
        updatedAt: spot.updatedAt,
        avgRating: 4,
        previewImage: "image url"
      })
    };

    res.json({
      Spots: spotArr,
      page,
      size
    });

  } catch (e) {
    next (e);
  }
});

// get all spots of current user
router.get('/current', requireAuth, async(req, res, next) => {
  try {
    const user = req.user

    const spots = await Spot.findAll({
      include: [{ model: Review, attributes: ['stars']}]
    })

    let spotArr = []

    for(let spot of spots) {

      if(user.id === spot.ownerId) {
        spotArr.push({
          id: spot.id,
          ownerId: spot.ownerId,
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
          updatedAt: spot.updatedAt,
          avgRating: 4,
          previewImage: "image url"
        })

        res.json({Spots: spotArr})

      }
    }
  } catch(e) {
    next(e)
  }
})

// get details of a spot from an id
router.get('/:spotId', async(req, res, next) => {
  try {

    const id = req.params.spotId
    const spots = await Spot.findByPk(id)


    if(!spots) {
      throw new CustomError("Spot couldn't be found", 404)
    }

    const owner = await User.findByPk(spots.ownerId);
    const spotImages = await SpotImage.findAll({
      where: {
        spotId: spots.id
      },
      attributes: ['id', 'url', 'preview']
    })

    const reviews = await Review.findAll({
      where: {spotId: spots.id}
    })

    let sum = 0;

    for(let review of reviews) {
      sum += review.stars
    }

    if(owner) {
      let spotArr = []
    
      spotArr.push({
        id: spots.id,
        ownerId: spots.ownerId,
        address: spots.address,
        city: spots.city,
        state: spots.state,
        country: spots.country,
        lat: spots.lat,
        lng: spots.lng,
        name: spots.name,
        description: spots.description,
        price: spots.price,
        createdAt: spots.createdAt,
        updatedAt: spots.updatedAt,
        numReviews: reviews.length,
        avgStarRating: sum / reviews.length,
        SpotImages: spotImages,
        Owner: {
          id: owner.id,
          firstName: owner.firstName,
          lastName: owner.lastName
        }
      })
  
      let resSpot = spotArr[0];
  
      res.json(resSpot)
    }

  } catch(e) {
    next(e)
  }
})

router.post('/', requireAuth, validateSpot, async(req, res, next) => {
  try {

    const {address, city, state, country, lat, lng, name, description, price} = req.body;

    const { user } = req;

    if(!user) {
        const error = new CustomError ("Forbidden", 403);
        throw error
    }

    const newSpot = await Spot.create({
      ownerId: user.id,
      address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
      })

      res.json(newSpot)


  } catch(e) {
    next(e)
  }
})

router.put('/:spotId', requireAuth, validateSpot, async(req, res, next) => {
  try {

    const {address, city, state, country, lat, lng, name, description, price} = req.body

    const { user } = req;
    const id = req.params.spotId

    const spotToUpdate = await Spot.findByPk(id)

    if(!spotToUpdate) {
      const error = new CustomError("Spot couldn't be found", 404)
      throw error
    }

    if(user.id !== spotToUpdate.ownerId) {
      const error = new CustomError ("Forbidden", 403);
      throw error
  }

     const updatedSpot = await spotToUpdate.update({
      ownerId: user.id,
      address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
      })

      res.json(updatedSpot)


  } catch(e) {
    next(e)
  }
})

router.delete('/:spotId', requireAuth, async(req, res, next) => {
  try {

    const id = req.params.spotId
    const user = req.user
    const spotToDelete = await Spot.findByPk(id)

    if(!spotToDelete) {
      throw new CustomError("Spot couldn't be found", 404)
    }

    if(user.id !== spotToDelete.ownerId) {
      const error = new CustomError("Forbidden", 403);
      throw error;
    } 

    await spotToDelete.destroy()

    res.json({
      "message": "Successfully deleted"
    })

  } catch(e) {
    next(e)
  }
})

// get all reviews by a spot's id
router.get('/:spotId/reviews', async(req, res, next) => {
  try {
    const id = req.params.spotId
    const spot = await Spot.findByPk(id)

    if(!spot) {
      const error = new CustomError("Spot  couldn't be found", 404);
      throw error
    }

    const reviews = await Review.findAll({
      where: {
        spotId: spot.id
      },
      include: [
        {model: User, attributes: ['id', 'firstName', 'lastName']},
        {model: ReviewImage, attributes: ['id', 'url']}
      ]
    })

    res.json({Review: reviews})
    
  } catch(e) {
    next(e)
  }
})

// create a review for a spot based on the spots id
router.post('/:spotId/reviews', requireAuth, validateReviews, async(req, res, next) => {
  try{

    const { review, stars } = req.body;
    const { user } = req;
    const id = req.params.spotId

    const spot = await Spot.findByPk(id)

    const alreadyReviewed = await Review.findAll({
      where: {
        spotId: spot.id,
        userId: user.id
      }
    })

    if(!user) {
      const error = new CustomError ("Forbidden", 403);
      throw error
    }

    if(!spot) {
      const error = new CustomError ("Spot couldn't be found", 404);
      throw error
    }
    
    if(alreadyReviewed) {
      const error = new CustomError ("User already has a review for this spot", 500);
      throw error
    }

    const newReview = await Review.create({
      userId: user.id,
      spotId: spot.id,
      review,
      stars
    })

    res.json(newReview)

  } catch(e) {
    next(e)
  }

})

// add an img to a spot based on spot id
router.post('/:spotId', requireAuth, async(req, res, next) => {
  try {
    
  } catch(e) {
    next(e)
  }
})

module.exports = router;