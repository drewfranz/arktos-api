const mongoose = require('mongoose');
import { TaskSchema } from '../models/taskModel';

const Task = mongoose.model('Task', TaskSchema);

// GET [/tasks] : Retrieve all tasks.
export const getAllTasks = async (req, res) => {
    try {
        await Task.find()
            .or([{user: req.user.sub}, {user: null}])
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
        const tasks = await Task.findById(id)
            .or([{user: req.user.sub}, {user: null}]);
        res.json(tasks);
    } catch (error) {
        next(error);
    }
};

// POST [/tasks] : Insert a new task.
export const addNewTask = (req, res, next) => {
    if (req.body.user === undefined) req.body.user = req.user.sub; 
    let newTask = new Task(req.body);
    // Insert the record.
    newTask.save((error, inserted) => {
        if (error) {
            // Something went wrong on insert, so send the error message.
            res.status(500).send({message: error.message});
        }
        // If successful, send the inserted object.
        res.status(201).json(inserted);
    });
};

// PUT: [/task/{id}] : Update task.
export const updateTask = (req, res, next) => {
    Task.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
        (error, task) => {
            if (error) {
                next(error);
            } else {
                res.status(204).send();
            }
        }
    );
};

// DELETE: [/task/{id}] : Delete task
export const deleteTask = (req, res, next) => {
    Task.findByIdAndDelete(
        req.params.id,
        (error, task) => {
            if (error) {
                next(error);
            } else {
                res.status(204).send()
            }
        }
    );
}