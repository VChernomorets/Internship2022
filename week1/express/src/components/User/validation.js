const Joi = require('joi');

module.exports = {
    paramsId: Joi.object().keys({
        id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
    }),
    update: Joi.object().keys({
        firstName: Joi.string().min(3).max(32),
        lastName: Joi.string().min(3).max(32),
    }),
};
