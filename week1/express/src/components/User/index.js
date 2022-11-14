const UserService = require('./service');
const ApiError = require('../../exceptions/api-error');

async function findAll(req, res) {
    try {
        const demo = await UserService.findAll();

        return res.status(200).json({
            data: demo,
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message,
            details: null,
        });
    }
}

async function create(req, res, next) {
    try {
        const { firstName, lastName, email } = req.body;
        const user = await UserService.create(firstName, lastName, email);

        return res.status(200).json({
            data: user,
        });
    } catch (error) {
        console.log('ERROR:!!!!!!!!!!!!');
        console.log(error);

        return next(error);
    }
}

async function deleteById(req, res) {
    try {
        const demo = await UserService.deleteById(req.params.id);

        return res.status(200).json({
            data: demo,
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message,
            details: null,
        });
    }
}

async function update(req, res) {
    try {
        const demo = await UserService.update(req.params.id, req.body);

        return res.status(200).json({
            data: demo,
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message,
            details: null,
        });
    }
}

module.exports = {
    findAll,
    create,
    deleteById,
    update,
};
