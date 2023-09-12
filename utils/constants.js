const errCodeInvalidData = 400;
const errCodeNotFound = 404;
const errCodeDefault = 500;
const defaultErrorMessage = 'Ошибка на сервере';

module.exports = {
  errCodeInvalidData,
  errCodeNotFound,
  errCodeDefault,
  defaultErrorMessage,
};

module.exports.limiterSetting = {
  windowMs: 5 * 60 * 1000,
  max: 500,
  standardHeaders: true,
  legacyHeaders: false,
};
