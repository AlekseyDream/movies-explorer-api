const router = require('express').Router();
const auth = require('../middlewares/auth');
const userRouter = require('./users');
const movieRouter = require('./movies');
const NotFoundError = require('../errors/NotFoundError');
const { signinValidate, signupValidate } = require('../middlewares/validation');
const { createUser, login } = require('../controllers/users');

router.post('/signup', signupValidate, createUser);
router.post('/signin', signinValidate, login);
router.use('/users', userRouter);
router.use('/movies', movieRouter);
router.use(auth);
router.use('*', (req, res, next) => next(new NotFoundError('Не найдено')));

module.exports = router;
