const mongoose = require('mongoose');

module.exports = {
    init() {
        mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).catch((error) => {
            console.log(error);
        });
        mongoose.connection
            .on('error', (err) => {
                console.error(err);
            })
            .on('open', () => {
                console.log('DB open');
            })
            .on('connected', () => {
                console.log('connection established successfully');
            });
    },
};
