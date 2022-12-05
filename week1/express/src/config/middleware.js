const bodyParser = require('body-parser');
const morgan = require('morgan');
const cookies = require('cookie-parser');
const ApiError = require('../exceptions/api-error');

module.exports = {
    bodyParser(app) {
        /**
         * BODY PARSER
         */
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());

        app.use((req, res, next) => {
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS ');
            res.header('Access-Control-Allow-Credentials', '*');
            res.header(
                'Access-Control-Allow-Headers',
                'Origin, X-Requested-With,'
                + ' Content-Type, Accept,'
                + ' Authorization,'
                + ' Access-Control-Allow-Credentials',
            );
            next();
        });
    },
    error(app) {
        /**
         * ERROR HANDLER
         */
        app.use((err, req, res, next) => {
            console.log(err);
            if (err instanceof ApiError) {
                res.status(err.status).json({ message: err.message, errors: err.errors });
                next();

                return;
            }
            res.status(500).json({ message: 'Unexpected error' });
            next();
        });
    },
    morgan(app) {
        /**
         * Logger
         */
        app.use(morgan((tokens, req, res) => [
            tokens.method(req, res),
            tokens.url(req, res),
            tokens.status(req, res),
            tokens.res(req, res, 'content-length'), '-',
            tokens['response-time'](req, res), 'ms',
        ].join(' ')));
    },
    cookieParser(app) {
        app.use(cookies());
    },
};
