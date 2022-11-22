const TokenService = require('../components/Token/service');
const ApiError = require('../exceptions/api-error');

module.exports = async (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;

        if (!authorizationHeader) {
            return next(ApiError.UnauthorizedError());
        }

        const accessToken = authorizationHeader.split(' ')[1];

        if (!accessToken) {
            return next(ApiError.UnauthorizedError());
        }

        const userData = await TokenService.validateAccessToken(accessToken);

        if (!userData) {
            return next(ApiError.UnauthorizedError());
        }
        req.user = userData;

        return next();
    } catch (e) {
        return next(ApiError.UnauthorizedError());
    }
};
