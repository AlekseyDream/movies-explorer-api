const router = require('express').Router();
const auth = require('../middlewares/auth');
const userRouter = require('./users');
const movieRouter = require('./movies');
const NotFoundError = require('../errors/NotFoundError');
const { signinValidate, signupValidate } = require('../middlewares/validation');
const { createUser, login, logout } = require('../controllers/users');
const { ERROR_MESSAGE } = require('../utils/constants');

router.post('/signup', signupValidate, createUser);
router.post('/signin', signinValidate, login);
router.post('/signout', logout);
router.use(auth);
router.use('/users', userRouter);
router.use('/movies', movieRouter);
router.use('/*', (req, res, next) => next(new NotFoundError(ERROR_MESSAGE.URL_NOT_FOUND)));

module.exports = router;
