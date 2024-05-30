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

// delete a review image
router.delete('/:imageId', requireAuth, async(req, res, next) => {
  try {
    const id = req.params.imageId;
    const { user } = req;

    const reviewImageToDelete = await ReviewImage.findByPk(id);

    if(!reviewImageToDelete) {
      const error = new CustomError("Review Image couldn't be found", 404);
      throw error;
    }

    const review = await Review.findByPk(reviewImageToDelete.reviewId);

    if(review.id === reviewImageToDelete.reviewId && user.id !== review.userId) {
      const error = new CustomError ("Forbidden", 403);
      throw error
    }

    await reviewImageToDelete.destroy();

    res.json({
      message: "Successfully deleted"
    })

  } catch(e) {
    next(e)
  }
})

module.exports = router;