const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('../models/user');
const { jwtKey } = require('../utils/config');
const { ERROR_CODE, ERROR_MESSAGE } = require('../utils/constants');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const NotFoundError = require('../errors/NotFoundError');

const { NODE_ENV, JWT_SECRET } = process.env;

const getUserById = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => next(new NotFoundError(ERROR_MESSAGE.USER_NOT_FOUND)))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return next(new BadRequestError(ERROR_MESSAGE.INVALID_DATA_PROFILE));
      }
      return next(err);
    });
};

const createUser = (req, res, next) => {
  const {
    name, password, email,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      password: hash,
      email,
    }))
    .then((user) => {
      res.status(ERROR_CODE.CREATED).send({
        name: user.name,
        email: user.email,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(
          new ConflictError(ERROR_MESSAGE.EMAIL_CONFLICT),
        );
      }
      if (err instanceof mongoose.Error.ValidationError) {
        return next(
          new BadRequestError(ERROR_MESSAGE.INVALID_DATA_PROFILE),
        );
      }
      return next(err);
    });
};

const updateUser = (req, res, next) => {
  const { name, email } = req.body;
  return User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true },
  )
    .orFail(() => next(new NotFoundError(ERROR_MESSAGE.USER_NOT_FOUND)))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return next(
          new BadRequestError(ERROR_MESSAGE.INVALID_DATA_PROFILE),
        );
      }
      return next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : jwtKey,
        {
          expiresIn: '7d',
        },
      );
      res.send({ token });
    })
    .catch(next);
};

const logout = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return next(new NotFoundError(ERROR_MESSAGE.USER_NOT_FOUND));
      }
      return res.clearCookie('jwt').send(ERROR_MESSAGE.GOODBYE);
    })
    .catch(next);
};

module.exports = {
  getUserById,
  createUser,
  updateUser,
  login,
  logout,
};
