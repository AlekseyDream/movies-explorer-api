const jwt = require('jsonwebtoken');
const { jwtKey } = require('../utils/config');
const UnauthorizedError = require('../errors/UnauthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError('Неправильные почта или пароль'));
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
    next(new UnauthorizedError('Неправильные почта или пароль'));
    return;
  }

  req.user = payload;

  next();
};
