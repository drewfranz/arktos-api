import { checkJwt } from '../middlewares';
import { getAllTasks, getTaskById, addNewTask, updateTask, deleteTask } from '../controllers/tasksController';

function routes (app) {
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
    // DELETE /tasks/{:id} : Delete one task by _id.
    app.route('/v1/tasks/:id')
        .delete(checkJwt, deleteTask);
}

export default routes;