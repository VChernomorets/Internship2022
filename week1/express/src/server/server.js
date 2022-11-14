require('dotenv').config();

const express = require('express');
const middleware = require('../config/middleware');
const router = require('../config/router');
const mongodb = require('../config/mongodb');
const errorMiddleware = require('../middlewares/error');

const app = express();

middleware.init(app);

router.init(app);

errorMiddleware.init(app);

mongodb.init();

app.set('port', process.env.PORT || 3000);

module.exports = app;
