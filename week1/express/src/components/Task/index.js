const TaskService = require('./service');

async function find(req, res, next) {
    try {
        const tasks = await TaskService.find(req.query, req.user);

        return res.status(200).json({
            data: tasks,
        });
    } catch (error) {
        return next(error);
    }
}

async function findAll(req, res, next) {
    try {
        const tasks = await TaskService.findAll(req.user);

        return res.status(200).json(tasks);
    } catch (error) {
        return next(error);
    }
}

async function create(req, res, next) {
    try {
        const task = await TaskService.create(req.body);

        return res.status(200).json({
            data: task,
        });
    } catch (error) {
        return next(error);
    }
}

async function update(req, res, next) {
    try {
        const task = await TaskService.update(req.params.id, req.body);

        return res.status(200).json({
            data: task,
        });
    } catch (error) {
        return next(error);
    }
}

module.exports = {
    find,
    update,
    create,
    findAll,
};
