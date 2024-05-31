// backend/routes/api/spots.js
const express = require('express');

const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const CustomError = require('../../errors/errors')


const { Spot, User, Review, ReviewImage, SpotImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

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

function dateFormatter(date) {
  const time = new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const formattedTime = time.format(date).split(' ')[0];
  const createdOrUpdatedAt = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${formattedTime}`;

  return createdOrUpdatedAt
}


// get all reviews of current user
router.get('/current', requireAuth, async(req, res, next) => {
  try {
    const user = req.user

    if(!user) {
      const error = new CustomError ("Forbidden", 403);
      throw error
    } 

    const reviews = await Review.findAll({
      where: {
        userId: user.id
      }
    })

    let reviewArr = [];

    for(let review of reviews) {
      const spot = await Spot.findByPk(review.spotId)

      const reviewImages = ReviewImage.findAll({
        where: {
          reviewId: review.id
        }
      })

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
      
      reviewArr.push({
          "id": review.id,
          "userId": review.userId,
          "spotId": review.spotId,
          "review": review.review,
          "stars": review.stars,
          "createdAt": dateFormatter(review.createdAt),
          "updatedAt": dateFormatter(review.updatedAt),
          "User": {
            "id": user.id,
            "firstName": user.firstName,
            "lastName": user.lastName
          },
          "Spot": {
            "id": spot.id,
            "ownerId": spot.ownerId,
            "address": spot.address,
            "city": spot.city,
            "state": spot.state,
            "country": spot.country,
            "lat": Number(spot.lat),
            "lng": Number(spot.lng),
            "name": spot.name,
            "price": Number(spot.price),
            "previewImage": preview
          },
          "ReviewImages": [reviewImages]
        }
      )
    }

    res.json({
      Reviews: reviewArr
    })

  } catch(e) {
    next(e)
  }
});

// edit a review
router.put('/:reviewId', requireAuth, validateReviews, async(req, res, next) => {
  try {

    const {review, stars} = req.body;
 
    const { user } = req;
    const id = req.params.reviewId

    const reviewToUpdate = await Review.findByPk(id)

    if(!reviewToUpdate) {
      const error = new CustomError("Review couldn't be found", 404);
      throw error
    }

    if(user.id !== reviewToUpdate.userId) {
      const error = new CustomError ("Forbidden", 403);
      throw error
    }

    const updatedReview = await reviewToUpdate.update({
      review,
      stars
    })

    res.json(updatedReview)

  } catch(e) {
    next(e)
  }
})

// delete a review
router.delete('/:reviewId', requireAuth, async(req, res, next) => {
  try {

    const { user } = req
    const id = req.params.reviewId;

    const reviewToDelete = await Review.findByPk(id);

    if(!reviewToDelete) {
      const error = new CustomError("Review couldn't be found", 404);
      throw error
    };

    if(user.id !== reviewToDelete.userId) {
      const error = new CustomError ("Forbidden", 403);
      throw error
    }

    await reviewToDelete.destroy()

    res.json({
      message: "Successfully deleted"
    })

  } catch(e) {
    next(e)
  }
})

// add an image to review based on review id
router.post('/:reviewId/images', requireAuth, async(req, res, next) => {
  try {
    const id = req.params.reviewId
    const {user} = req;

    const { url } = req.body

    const review = await Review.findByPk(id)
    const reviewImages = await ReviewImage.findAll({
      where: {
        reviewId: id
      }
    })

    if(!review) {
      const error = new CustomError ("Review couldn't be found", 404);
      throw error;
    }

    if(user.id !== review.id) {
      const error = new CustomError ("Forbidden", 403);
      throw error;
    }

    if(reviewImages.length >= 10) {
      const error = new CustomError ("Maximum number of images for this resource was reached", 403);
      throw error;
    }

    await ReviewImage.create({
      reviewId: id,
      url
    })

    res.json({
      id,
      url
    })
    
  } catch(e) {
    next(e)
  }
})

module.exports = router;