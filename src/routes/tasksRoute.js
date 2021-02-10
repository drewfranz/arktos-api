import { checkJwt } from '../middlewares';
import { getAllTasks, getTaskById, addNewTask, updateTask } from '../controllers/tasksController';

const routes = app => {
    // GET /tasks : Get all tasks
    app.route('/v1/tasks')
        .get(checkJwt, getAllTasks);
    // GET /tasks/{:id} : Get one task by _id.
    app.route('/v1/tasks/:id')
        .get(checkJwt, getTaskById);
    // POST /tasks : Insert new Task.
    app.route('/v1/tasks')
        .post(checkJwt, addNewTask);
    // PUT /tasks/{:id} : Update one task by _id.
    app.route('/v1/tasks/:id')
        .put(checkJwt, updateTask);
}

export default routes;