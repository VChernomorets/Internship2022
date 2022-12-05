require('dotenv').config();

const express = require('express');
const middleware = require('../config/middleware');
const router = require('../config/router');
const mongodb = require('../config/mongodb');

const app = express();

middleware.bodyParser(app);
middleware.morgan(app);
middleware.cookieParser(app);

router.init(app);

middleware.error(app);

mongodb.init();

app.set('port', process.env.PORT || 3000);

module.exports = app;
