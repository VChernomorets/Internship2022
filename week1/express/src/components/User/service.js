const UserModel = require('./UserModel');
const ApiError = require('../../exceptions/api-error');

function findAll() {
    return UserModel.find();
}

async function find(id) {
    return UserModel.findOne({ _id: id });
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
    findAll,
    deleteById,
    update,
    find,
};
