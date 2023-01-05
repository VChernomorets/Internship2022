const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    assignee: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    estimatedTime: {
        type: Number,
        required: true,
    },
    createdBy: {
        type: String,
        required: true,
    },
});

module.exports = model('Tasks', UserSchema);
