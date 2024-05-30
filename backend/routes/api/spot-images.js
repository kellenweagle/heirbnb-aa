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

// delete a spot image
router.delete('/:imageId', requireAuth, async(req, res, next) => {
  try {
    const id = req.params.imageId;
    const { user } = req;

    const spotImageToDelete = await SpotImage.findByPk(id);

    if(!spotImageToDelete) {
      const error = new CustomError("Spot Image couldn't be found", 404);
      throw error;
    }

    const spot = await Spot.findByPk(spotImageToDelete.spotId);

    if(spot.id === spotImageToDelete.spotId && user.id !== spot.ownerId) {
      const error = new CustomError ("Forbidden", 403);
      throw error
    }

    await spotImageToDelete.destroy();

    res.json({
      message: "Successfully deleted"
    })

  } catch(e) {
    next(e)
  }
})

module.exports = router;