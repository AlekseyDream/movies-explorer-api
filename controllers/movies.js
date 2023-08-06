const mongoose = require('mongoose');
const Movie = require('../models/movie');
const { ERROR_CODE, ERROR_MESSAGE } = require('../utils/constants');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description, image,
    trailerLink, thumbnail, movieId, nameRU, nameEN,
  } = req.body;
  const owner = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner,
  })
    .then((movie) => res.status(ERROR_CODE.CREATED).send(movie))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return next(
          new BadRequestError(ERROR_MESSAGE.INVALID_DATA_MOVIE),
        );
      }
      return next(err);
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(() => {
      throw new NotFoundError(ERROR_MESSAGE.MOVIE_NOT_FOUND);
    })
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id.toString()) {
        throw new ForbiddenError(ERROR_MESSAGE.MOVIE_FORBIDDEN);
      }
      movie.deleteOne()
        .then(() => {
          res.status(ERROR_CODE.OK).send(ERROR_MESSAGE.MOVIE_SUCCESS_REMOVE);
        })
        .catch(next);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return next(
          new BadRequestError(ERROR_MESSAGE.INVALID_DATA_MOVIE),
        );
      }
      return next(err);
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
