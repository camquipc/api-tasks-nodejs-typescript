
import { Router} from 'express';
import {body} from 'express-validator';
import {createTask, deleteTask, getTasks, updateTask} from "../controllers/tasks";
const tasksRouter = Router();

const validateTask = [
    body('title').isString().notEmpty(),
    body('description').isString().notEmpty(),
    body('completed').isBoolean().notEmpty()
];


/**
 * @openapi
 * tags:
 * name: Tasks Controller
 * description: API for tasks in the system
 */

/** GET Methods */
/**
 * @openapi
 * '/api/tasks/':
 *  get:
 *     tags: [Tasks Controller]
 *     summary: Get all tasks
 *
 *     responses:
 *      200:
 *        description: Fetched Successfully
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
tasksRouter.get('/',getTasks);

/** POST Methods */
/**
 * @openapi
 * '/api/tasks/':
 *  post:
 *     tags: [Tasks Controller]
 *     summary: Create a Task
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - title
 *              - description
 *              - completed
 *            properties:
 *              title:
 *                type: string
 *                default: Task 1
 *              description:
 *                type: string
 *                default: Description 1
 *              completed:
 *                type: boolean
 *                default: false
 *     responses:
 *      201:
 *        description: Created
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */

tasksRouter.post('/',validateTask,createTask);
/** PATCH Methods */
    /**
     * @openapi
     * '/api/tasks/{taskId}':
     *  patch:
     *     tags: [Tasks Controller]
     *     summary: Update a task by Id
     *     parameters:
     *      - name: taskId
     *        in: path
     *        description: The unique Id of the task
     *        required: true
     *     requestBody:
     *      required: false
     *      content:
     *        application/json:
     *           schema:
     *            type: object
     *            required:
     *              - taskId
     *            properties:
     *              taskId:
     *                type: number
     *                default: ''
     *              title:
     *                type: string
     *                default: ''
     *              description:
     *                type: string
     *                default:
     *              completed:
     *                type: boolean
     *                default: false
     *     responses:
     *      200:
     *        description: Modified
     *      400:
     *        description: Bad Request
     *      404:
     *        description: Not Found
     *      500:
     *        description: Server Error
     */
tasksRouter.patch('/:id', updateTask)
/** DELETE Methods */
    /**
     * @openapi
     * '/api/tasks/{taskId}':
     *  delete:
     *     tags: [Tasks Controller]
     *     summary: Delete task by Id
     *     parameters:
     *      - name: taskId
     *        in: path
     *        description: The unique Id of the task
     *        required: true
     *     responses:
     *      200:
     *        description: Removed
     *      400:
     *        description: Bad request
     *      404:
     *        description: Not Found
     *      500:
     *        description: Server Error
     */
tasksRouter.delete('/:id', deleteTask)
export { tasksRouter };
