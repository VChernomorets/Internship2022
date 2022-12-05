const Joi = require('joi');

module.exports = {
    register: Joi.object().keys({
        firstName: Joi.string().min(3).max(32).required(),
        lastName: Joi.string().min(3).max(32).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(3).max(32).required(),
    }),
    login: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().min(3).max(32).required(),
    }),
};
