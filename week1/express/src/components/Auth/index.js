const AuthService = require('./service');
const TokenService = require('../Token/service');

async function register(req, res, next) {
    try {
        const {
            firstName, lastName, email, password,
        } = req.body;
        const user = await AuthService.register(firstName, lastName, email, password);

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
        const user = await AuthService.login(email, password);

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
        console.log(req.cookies);
        const { refreshToken } = req.cookies;
        const token = await AuthService.logout(refreshToken);

        res.clearCookie('refreshToken');

        return res.json(token);
    } catch (e) {
        return next(e);
    }
}

async function refresh(req, res, next) {
    try {
        const { token } = req.query;
        const userData = await AuthService.refresh(token);

        res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

        return res.json(userData);
    } catch (e) {
        return next(e);
    }
}

async function getProfile(req, res, next) {
    try {
        const { id } = await TokenService.getDataByAccessToken(req.headers.authorization.split(' ')[1]);
        const user = await AuthService.getProfile(id);

        return res.json(user);
    } catch (e) {
        return next(e);
    }
}

module.exports = {
    register,
    login,
    refresh,
    logout,
    getProfile,
};
