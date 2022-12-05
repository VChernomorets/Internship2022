const { validationResult } = require('express-validator');
const ApiError = require('../../exceptions/api-error');
const UserService = require('./service');

async function findAll(req, res, next) {
    try {
        const users = await UserService.findAll();

        return res.status(200).json({
            data: users,
        });
    } catch (error) {
        return next(error);
    }
}

async function find(req, res, next) {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return next(ApiError.BadRequest('Validation error!', errors.array()), 400);
        }
        const user = await UserService.find(req.params.id);

        return res.status(200).json({
            data: user,
        });
    } catch (error) {
        return next(error);
    }
}

async function deleteById(req, res, next) {
    try {
        const demo = await UserService.deleteById(req.params.id);

        return res.status(200).json({
            data: demo,
        });
    } catch (error) {
        return next(error);
    }
}

async function update(req, res, next) {
    try {
        const demo = await UserService.update(req.params.id, req.body);

        return res.status(200).json({
            data: demo,
        });
    } catch (error) {
        return next(error);
    }
}

module.exports = {
    findAll,
    deleteById,
    update,
    find,
};
