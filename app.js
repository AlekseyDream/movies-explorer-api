require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const Limit = require('express-rate-limit');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');

const router = require('./routes');
const handleError = require('./middlewares/handleError');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { limiterSetting } = require('./utils/constants');

const app = express();
app.use(cors({
  origin: [
    'http://localhost:3001',
    'http://localhost:3000',
    'http://api.dream.movie.nomoreparties.co',
    'http://dream.movie.nomoreparties.co',
    'https://dream.movie.nomoreparties.co',
    'https://api.dream.movie.nomoreparties.co',
  ],
  credentials: true,
  maxAge: 30,
}));
const { PORT = 3000, DB_ADDRESS = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;
const limiter = Limit(limiterSetting);
app.use(limiter);
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
mongoose.connect(DB_ADDRESS, {});
app.use(requestLogger);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(handleError);
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
