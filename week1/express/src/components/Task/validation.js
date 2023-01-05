const Joi = require('joi');

module.exports = {
    paramsId: Joi.object().keys({
        id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
    }),
    create: Joi.object().keys({
        assignee: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
        title: Joi.string().min(3).max(255).required(),
        description: Joi.string().min(3).max(3000).required(),
        estimatedTime: Joi.number().min(1).max(960).required(),
        createdBy: Joi.string().min(3).max(32).required(),
    }),
    update: Joi.object().keys({
        assignee: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
        title: Joi.string().min(3).max(255),
        description: Joi.string().min(3).max(3000),
        estimatedTime: Joi.number().min(1).max(960),
        createdBy: Joi.string().min(3).max(32),
    }),
    find: Joi.object().keys({
        page: Joi.number().min(1).required(),
        limit: Joi.number().min(1).required(),
    }),

};
