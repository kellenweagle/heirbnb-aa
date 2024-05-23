// backend/routes/api/spots.js
const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot } = require('../../db/models');

const router = express.Router();

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Invalid email'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Username is required'),
  check('firstName')
    .exists({ checkFalsy: true })
    .isLength({min: 1})
    .withMessage('First Name is required'),
  check('lastName')
    .exists({ checkFalsy: true })
    .isLength({min: 1})
    .withMessage('Last Name is required'),
  handleValidationErrors
];



module.exports = router;