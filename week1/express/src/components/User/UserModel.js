const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        index: true,
    },
    password: {
        type: String,
        required: true,
    },
});

UserSchema.pre('save', async function (next) { // this line
    const user = this;

    if (!user.isModified('password')) return next();
    user.password = await bcrypt.hash(user.password, 8);

    return next();
});

module.exports = model('User', UserSchema);
