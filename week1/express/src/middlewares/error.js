const ApiError = require('../exceptions/api-error');

module.exports = {
    init(app) {
        app.use((err, req, res) => {
            console.log('+++++++++++++++++ERROR MIDDLEWARE+++++++++++++++');
            if (err instanceof ApiError) {
                return res.status(err.status).json({ message: err.message, errors: err.errors });
            }

            return res.status(500).json({ message: 'Unexpected error' });
        });
    },
};
