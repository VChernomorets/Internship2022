const bodyParser = require('body-parser');
const ApiError = require('../exceptions/api-error');

module.exports = {
    init(app) {
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
                return res.status(err.status).json({ message: err.message, errors: err.errors });
            }

            return res.status(500).json({ message: 'Unexpected error' });
        });
    },
};
