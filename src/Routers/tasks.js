const express = require('express');
const router = express.Router();
const tasks = require('../Models/tasks');   


// Crear una tarea
router.post('/', (req, res) => {
    const { title, description,completed } = req.body;
    const id = tasks.length + 1;
    const newTask = { id, title, description,completed };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// Leer todas las tareas
router.get('/', (req, res) => {
    res.status(200).json(tasks);
});

// Actualizar una tarea
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { title, description,completed } = req.body;
    const task = tasks.find(task => task.id === parseInt(id));
    if(!task){
        return res.status(404).json({ message: 'Task not found' });
    }
    task.title = title;
    task.description = description;
    task.completed = completed;
    res.status(200).json(task);
});

// Eliminar una tarea
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    tasks = tasks.filter(task => task.id !== parseInt(id));
    res.status(200).json({ message: 'Task deleted successfully'});
});

module.exports = router;