const bcrypt = require('bcrypt');
const UserModel = require('../User/UserModel');
const ApiError = require('../../exceptions/api-error');
const UserDto = require('../User/dto');
const tokenService = require('../Token/service');

async function register(firstName, lastName, email, password) {
    const candidate = await UserModel.findOne({ email });

    if (candidate) {
        throw ApiError.BadRequest(`User with email address ${email} already exists`);
    }
    const user = new UserDto(await UserModel.create({
        email, password, lastName, firstName,
    }));
    const tokens = tokenService.generateToken({ ...user });

    await tokenService.saveToken(user.id, tokens.refreshToken);

    return { ...tokens, user };
}

async function login(email, password) {
    const user = await UserModel.findOne({ email });

    if (!user) {
        throw ApiError.BadRequest('No user found with this email.');
    }
    const isPassword = await bcrypt.compare(password, user.password);

    if (!isPassword) {
        throw ApiError.BadRequest('Invalid password.');
    }
    const userDto = new UserDto(user);
    const tokens = tokenService.generateToken({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
}

function logout(refreshToken) {
    return tokenService.removeToken(refreshToken);
}

async function refresh(refreshToken) {
    if (!refreshToken) {
        throw ApiError.BadRequest('No refreshToken');
    }
    const userData = await tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);

    if (!userData || !tokenFromDb) {
        throw ApiError.BadRequest('Error refreshToken');
    }
    const user = await UserModel.findById(userData.id);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateToken({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
}

async function getProfile(id) {
    const user = await UserModel.findById(id);

    return new UserDto(user);
}

module.exports = {
    register,
    login,
    logout,
    refresh,
    getProfile,
};
