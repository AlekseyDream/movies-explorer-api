module.exports.ERROR_CODE = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT_STATUS: 409,
  SERVER_ERROR: 500,
};

module.exports.ERROR_MESSAGE = {
  OK: 'ОК',
  UNAUTHORIZED: 'Необходима авторизация.',
  SERVER_ERROR: 'На сервере произошла ошибка.',
  MOVIE_FORBIDDEN: 'Попытка удалить чужой фильм.',
  MOVIE_NOT_FOUND: 'Фильм не найден.',
  USER_NOT_FOUND: 'Пользователь не найден.',
  URL_NOT_FOUND: 'Запрашиваемый ресурс не найден.',
  URL_INVALID: 'Некорректный URL',
  EMAIL_INVALID: 'Некорректный Email',
  EMAIL_CONFLICT: 'Пользователь с таким email уже существует.',
  MOVIE_CONFLICT: 'Фильм уже сохранен',
  MOVIE_SUCCESS_REMOVE: 'Фильм успешно удален.',
  INVALID_EMAIL_OR_PASSWORD: 'Неверные почта или пароль',
  INVALID_DATA_PROFILE: 'Некорректные данные пользователя.',
  INVALID_DATA_MOVIE: 'Некорректные данные фильма.',
  GOODBYE: 'До скорой встречи!',
};

module.exports.REG_URL = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;
module.exports.REG_ID = /^[0-9a-fA-F]{24}$/;
