const UserModel = require('./UserModel');
const ApiError = require('../../exceptions/api-error');

function findAll() {
    return UserModel.find();
}

/**
 *  Leave create service method for future, when we will connect mongo,
 *  we will do manipulations here
 */
async function create(firstName, lastName, email) {
    const candidate = await UserModel.findOne({ email });

    if (candidate) {
        throw ApiError.BadRequest(`User with email address ${email} already exists`);
    }

    return UserModel.create({ email, lastName, firstName });
}

async function deleteById(id) {
    const candidate = await UserModel.findOne({ _id: id });

    if (!candidate) {
        throw ApiError.BadRequest('User not found');
    }

    return UserModel.deleteOne({ _id: id });
}

async function update(id, data) {
    const candidate = await UserModel.findOne({ _id: id });

    if (!candidate) {
        throw ApiError.BadRequest('User not found');
    }

    await UserModel.findOneAndUpdate({ _id: id }, { ...data });

    return UserModel.findById(id);
}

module.exports = {
    create,
    findAll,
    deleteById,
    update,
};