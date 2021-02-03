import { getAllTasks, getTaskById, addNewTask } from '../controllers/tasksController';

const routes = app => {
    // GET /tasks : Get all tasks
    app.route('/v1/tasks')
        .get(getAllTasks);
    // GET /tasks/{:id} : Get one task by _id.
    app.route('/v1/tasks/:id')
        .get(getTaskById);
    // POST /tasks : Insert new Task.
    app.route('/v1/tasks')
        .post(addNewTask);
}

export default routes;