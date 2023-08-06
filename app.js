require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const router = require('./routes');
const { databaseUrl } = require('./utils/config');
const limiter = require('./middlewares/rateLimiter');
const errorsHandler = require('./middlewares/errorsHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000, NODE_ENV, DATABASE_URL } = process.env;

mongoose.connect(NODE_ENV === 'production' ? DATABASE_URL : databaseUrl);
const app = express();
app.use(requestLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(limiter);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorsHandler);
app.listen(PORT);
