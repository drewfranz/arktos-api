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
        type: Number,
        min: 0,
        default: 0
    },
    hoursSpent: {
        type: Number,
        min: 0,
        default: 0
    }, 
    createdOn: {
        type: Date,
        default: Date.now
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',

    },
    status: {
        type: String,
        enum: ["open","inProgress","test","approved","closed"],
        required: true,
        default: "open"
    }
});

TaskSchema.path('issueUrl').validate((val) => {
    console.log(val);
    const urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
    return urlRegex.test(val);
}, 'Invalid URL.');