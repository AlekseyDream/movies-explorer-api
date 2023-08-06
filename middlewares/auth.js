const jwt = require('jsonwebtoken');
const { jwtKey } = require('../utils/config');
const { ERROR_MESSAGE } = require('../utils/constants');
const UnauthorizedError = require('../errors/UnauthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError(ERROR_MESSAGE.INVALID_EMAIL_OR_PASSWORD));
    return;
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : jwtKey,
    );
  } catch (err) {
    next(new UnauthorizedError(ERROR_MESSAGE.INVALID_EMAIL_OR_PASSWORD));
    return;
  }

  req.user = payload;

  next();
};
