const { Types } = require('mongoose');
const TaskModel = require('./model');
const UserModel = require('../User/UserModel');
const ApiError = require('../../exceptions/api-error');

async function find(params, user) {
    const tasks = await TaskModel.find({ assignee: user.id })
        .skip((params.page - 1) * params.limit)
        .limit(params.limit);
    const totalTasks = await TaskModel.count();

    return {
        tasks,
        totalTasks,
    };
}

async function findAll(user) {
    const pipeline = [
        { $match: { _id: Types.ObjectId(user.id) } },
        {
            $project: {
                _id: 1,
                name: { $concat: ['$firstName', ' ', '$lastName'] },
                totalTasks: { $arrayElemAt: ['$totalTasks.total', 0] },
                totalEstimation: { $arrayElemAt: ['$totalEstimation', 0] },
                tasks: 1,
            },
        },
        {
            $lookup:
                {
                    from: 'tasks',
                    localField: '_id',
                    foreignField: 'assignee',
                    as: 'tasks',
                },
        },
        {
            $lookup:
                {
                    from: 'tasks',
                    localField: '_id',
                    foreignField: 'assignee',
                    as: 'totalEstimation',
                    pipeline: [
                        {
                            $group: {
                                _id: null,
                                total: {
                                    $sum: '$estimatedTime',
                                },
                            },
                        },
                    ],
                },
        },
        {
            $lookup:
                {
                    from: 'tasks',
                    localField: '_id',
                    foreignField: 'assignee',
                    as: 'totalTasks',
                    pipeline: [{
                        $count: 'total',
                    }],
                },
        },
        // {
        //     $facet: {
        //         metadata: [{ $count: 'total' }],
        //         name: [
        //             {
        //                 $lookup:
        //                 {
        //                     from: 'tasks',
        //                     localField: 'assignee',
        //                     foreignField: '_id',
        //                     as: 'tasks',
        //                 },
        //             },
        //         ],
        //         tasks: [{ $match: { assignee: Types.ObjectId(user.id) } }],
        //     },
        // },
        // {
        //     $project: {
        //         tasks: 1,
        //         // Get total from the first element of the metadata array
        //         total: { $arrayElemAt: ['$metadata.total', 0] },
        //         name: { $arrayElemAt: ['$name', 0] },
        //     },
        // },
        // { $limit: 5 },
        // {
        //     $facet: {
        //         tasks: [
        //             { $match: { assignee: Types.ObjectId(user.id) } },
        //             { $sort: { estimatedTime: -1 } },
        //             { $addFields: { totalTasks: '$count' } },
        //         ],
        //     },
        // },
        // {
        //     $lookup:
        //         {
        //             from: 'users',
        //             localField: 'assignee',
        //             foreignField: '_id',
        //             as: 'user',
        //         },
        // },
    ];

    // const pipeline = [
    //     { $match: { _id: Types.ObjectId(user.id) } },
    //     { $project: { _id: 1, name: { $concat: ['$firstName', ' ', '$lastName'] } } },
    //     {
    //         $lookup:
    //             {
    //                 from: 'tasks',
    //                 localField: '_id',
    //                 foreignField: 'assignee',
    //                 as: 'tasks',
    //             },
    //     },
    // ];
    const tasks = await UserModel.aggregate(pipeline);

    return tasks;
}

async function create(data) {
    const user = await UserModel.findById(data.assignee);

    if (!user) {
        throw ApiError.BadRequest('User not found');
    }

    const task = await TaskModel.create({
        assignee: data.assignee,
        title: data.title,
        description: data.description,
        estimatedTime: data.estimatedTime,
        createdBy: data.createdBy,
    });

    return task;
}

async function update(id, data) {
    const candidate = await UserModel.findOne({ _id: id });

    if (!candidate) {
        throw ApiError.BadRequest('Task not found');
    }

    // Safely?
    await TaskModel.findOneAndUpdate({ _id: id }, { ...data });

    return TaskModel.findById(id);
}

module.exports = {
    find,
    update,
    create,
    findAll,
};
