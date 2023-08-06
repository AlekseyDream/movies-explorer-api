const { ERROR_CODE, ERROR_MESSAGE } = require('../utils/constants');

function errorsHandler(err, req, res, next) {
  const { statusCode = ERROR_CODE.SERVER_ERROR, message } = err;
  res.status(statusCode).send({
    message: statusCode === ERROR_CODE.SERVER_ERROR ? ERROR_MESSAGE.SERVER_ERROR : message,
  });
  next();
}

module.exports = errorsHandler;
