// backend/routes/api/spots.js
const express = require('express');

const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const CustomError = require('../../errors/errors')

const { Op } = require('sequelize')

const { Spot, User, Review, ReviewImage } = require('../../db/models');
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

// get all reviews of current user
router.get('/current', requireAuth, async(req, res, next) => {
  try {
    const user = req.user

    if(user) {
      const reviews = await Review.findAll({
        where: {
          userId: user.id
        },
        include: [
          {model: User, attributes: ['id', 'firstName', 'lastName']},
          {model: Spot, attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price']},
          {model: ReviewImage, attributes: ['id', 'url']}
        ]
      })
      res.json({
          Reviews: reviews
      })
    }
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

module.exports = router;