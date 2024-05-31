// backend/routes/api/users.js
const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

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

// Sign up a user
router.post('/', validateSignup, async (req, res, next) => {
    try {
      const { firstName, lastName, email, password, username } = req.body;
      const hashedPassword = bcrypt.hashSync(password);

      const checkUniqueEmail = await User.findOne({
        where: { email }
      })

      const checkUniqueUsername = await User.findOne({
        where: { username }
      })

      if(checkUniqueEmail) {
        const error = new Error("User already exists")

        error.errors = {
          "email": "User with that email already exists"
        }
        next(error)
      }

      if(checkUniqueUsername) {
        const error = new Error("User already exists")

        error.errors = {
          "username": "User with that username already exists"
        }
        next(error)
      }

      const user = await User.create({ firstName, lastName, email, username, hashedPassword });
  
      const safeUser = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
      };

      await setTokenCookie(res, safeUser);

      return res.json({
        user: safeUser
      });
  } catch (e) {
    next (e)
  }
  }
);

module.exports = router;