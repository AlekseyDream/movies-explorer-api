const router = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { movieIdValidate, movieValidate } = require('../middlewares/validation');

router.get('/', getMovies);
router.post('/', movieValidate, createMovie);
router.delete('/:movieId', movieIdValidate, deleteMovie);

module.exports = router;
