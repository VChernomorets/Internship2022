const jwt = require('jsonwebtoken');
const tokenModel = require('./model');

function generateToken(payload) {
    console.log(payload);
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '30m' });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });

    return {
        accessToken,
        refreshToken,
    };
}

async function saveToken(userId, refreshToken) {
    const tokenData = await tokenModel.findOne({ user: userId });

    if (tokenData) {
        tokenData.refreshToken = refreshToken;

        return tokenData.save();
    }

    return tokenModel.create({ user: userId, refreshToken });
}

async function removeToken(refreshToken) {
    return tokenModel.deleteOne({ refreshToken });
}

async function validateAccessToken(token) {
    try {
        const test = await jwt.verify(token, process.env.JWT_ACCESS_SECRET);

        console.log(test);

        return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    } catch (e) {
        return null;
    }
}

async function getDataByAccessToken(token) {
    try {
        return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    } catch (e) {
        return null;
    }
}

async function validateRefreshToken(token) {
    try {
        return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    } catch (e) {
        return null;
    }
}

async function findToken(refreshToken) {
    return tokenModel.findOne({ refreshToken });
}

module.exports = {
    generateToken,
    saveToken,
    validateAccessToken,
    getDataByAccessToken,
    removeToken,
    validateRefreshToken,
    findToken,
};
