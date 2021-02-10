// Schema
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

export const TaskSchema = new Schema({
    title: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 250
    },
    description: {
        type: String,
        default: ''
    },
    issueUrl: {
        type: String
        
    },
    size: {
        type: Number,
        required: true,
        min: 1,
        max: 10,
        default: 1
    },
    estimatedHours: {
        type: mongoose.Schema.Types.Decimal128
    },
    hoursSpent: {
        type: mongoose.Schema.Types.Decimal128
    },
    isPriority: {
        type: Boolean,
        default: false
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'

    },
    user: {
        type: String,
        default: ''

    },
    status: {
        type: String,
        enum: ["open","inProgress","test","approved","closed"],
        required: true,
        default: "open"
    }
}, {
    timestamps: true
});

TaskSchema.path('issueUrl').validate((val) => {
    const urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
    return urlRegex.test(val);
}, 'Invalid URL.');