const Joi = require('joi');

module.exports = {
    create: Joi.object().keys({
        firstName: Joi.string().min(3).max(32).required(),
        lastName: Joi.string().min(3).max(32).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(3).max(32).required(),
    }),
    paramsId: Joi.object().keys({
        id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
    }),
    login: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().min(3).max(32).required(),
    }),
    update: Joi.object().keys({
        firstName: Joi.string().min(3).max(32),
        lastName: Joi.string().min(3).max(32),
    }),
};
