const mongoose = require('mongoose');
import { TaskSchema } from '../models/taskModel';

const Task = mongoose.model('Task', TaskSchema);

// GET [/tasks] : Retrieve all tasks.
export const getAllTasks = async (req, res) => {
    try {
        await Task.find()
            .then(tasks => {
                return res.json(tasks)
            });
    } catch (error) {
        res.json(error)
    }
};

// GET [/tasks/{:id}] : Retrieve one tasks.
export const getTaskById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const tasks = await Task.findById(id);
        res.json(tasks);
    } catch (error) {
        next(error);
    }
};

// POST [/tasks] : Insert a new task.
export const addNewTask = (req, res, next) => {
    let newTask = new Task(req.body);
    // Insert the record.
    newTask.save((error, inserted) => {
        if (error) {
            // Something went wrong on insert, so send the error message.
            res.status(500).send(error.message);
        }
        // If successful, send the inserted object.
        res.status(201).json(inserted);
    });
};