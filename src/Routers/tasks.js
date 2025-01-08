const express = require("express");
const router = express.Router();
const tasks = require("../Models/tasks");



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
router.get("/", (req, res) => {
  res.status(200).json(tasks);
});

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
router.post("/", (req, res) => {
  const { title, description, completed } = req.body;
  const id = tasks.length + 1;
  const newTask = { id, title, description, completed };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

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
router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;
  const task = tasks.find((task) => task.id === parseInt(id));
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }
  task.title = title;
  task.description = description;
  task.completed = completed;
  res.status(200).json(task);
});

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
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter((task) => task.id !== parseInt(id));
  res.status(200).json({ message: "Task deleted successfully" });
});

module.exports = router;
