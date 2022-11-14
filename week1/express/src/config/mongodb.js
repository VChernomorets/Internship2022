const mongoose = require('mongoose');

module.exports = {
    init() {
        mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).catch((error) => {
            console.log(error);
        });
    },
};
