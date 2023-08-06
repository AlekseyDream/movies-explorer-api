const { celebrate, Joi } = require('celebrate');
const { REG_URL, REG_ID } = require('../utils/constants');

const signinValidate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const signupValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const userInfoValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email(),
  }),
});

const movieValidate = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    nameEN: Joi.string().required(),
    nameRU: Joi.string().required(),
    image: Joi.string().required().regex(REG_URL),
    trailerLink: Joi.string().required().regex(REG_URL),
    thumbnail: Joi.string().required().regex(REG_URL),
    movieId: Joi.number().required(),
  }),
});

const movieIdValidate = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().regex(REG_ID),
  }),
});

module.exports = {
  signinValidate,
  signupValidate,
  userInfoValidate,
  movieValidate,
  movieIdValidate,
};
