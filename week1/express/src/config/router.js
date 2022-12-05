const express = require('express');
const http = require('http');

// ROUTERS
const UserRouter = require('../components/User/router');
const AuthRouter = require('../components/Auth/router');

module.exports = {
    init(app) {
        const router = express.Router();

        app.use('/v1/user', UserRouter);
        app.use('/v1/auth', AuthRouter);

        app.use((req, res) => {
            res.status(404).send(http.STATUS_CODES[404]);
        });

        app.use(router);
    },
};
