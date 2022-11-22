const { validationResult } = require('express-validator');
const ApiError = require('../../exceptions/api-error');
const UserService = require('./service');
const TokenService = require('../Token/service');

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

async function create(req, res, next) {
    try {
        const {
            firstName, lastName, email, password,
        } = req.body;
        const user = await UserService.register(firstName, lastName, email, password);

        res.cookie('refreshToken', user.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

        return res.status(200).json({
            data: user,
        });
    } catch (error) {
        return next(error);
    }
}

async function login(req, res, next) {
    try {
        const { email, password } = req.body;
        const user = await UserService.login(email, password);

        res.cookie('refreshToken', user.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

        return res.status(200).json({
            data: user,
        });
    } catch (error) {
        return next(error);
    }
}

async function logout(req, res, next) {
    try {
        const { refreshToken } = req.cookies;
        const token = await UserService.logout(refreshToken);

        res.clearCookie('refreshToken');

        return res.json(token);
    } catch (e) {
        return next(e);
    }
}

async function refresh(req, res, next) {
    try {
        const { refreshToken } = req.query;
        const userData = await UserService.refresh(refreshToken);

        res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

        return res.json(userData);
    } catch (e) {
        return next(e);
    }
}

async function getProfile(req, res, next) {
    try {
        const { id } = await TokenService.getDataByAccessToken(req.headers.authorization.split(' ')[1]);
        const user = await UserService.getProfile(id);

        return res.json(user);
    } catch (e) {
        return next(e);
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
    create,
    deleteById,
    update,
    find,
    login,
    refresh,
    logout,
    getProfile,
};
