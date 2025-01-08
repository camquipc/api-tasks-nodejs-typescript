import { Request, Response } from "express";
import Task from "../models/tasks";

export const getTasks = async (req,res) => {
  try {
    res.status(200).json(Task);
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving tasks", error });
  }
};

export const getTask = async (
  req,res
) => {
  try {
    const { id } = req.params;

    const task = Task.find((task) => task.id === parseInt(id));
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving task", error });
  }
};

export const createTask = async (
  req,res
) => {
  try {
    const { title, description, completed } = req.body;
    const id = Task.length + 1;
    const newTask = { id, title, description, completed };
    Task.push(newTask);
    res.status(201).json(newTask);
  } catch (error) {
    return res.status(500).json({ message: "Error creating task", error });
  }
};

export const updateTask = async (
  req,res
) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    const task = Task.find((task) => task.id === parseInt(id));
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    task.title = title;
    task.description = description;
    task.completed = completed;
    res.status(200).json(task);
  } catch (error) {
    return res.status(500).json({ message: "Error updating task", error });
  }
};

export const deleteTask = async (
  req,res
) => {
  try {
    const { id } = req.params;
    const updatedTasks = Task.filter((task) => task.id !== parseInt(id));
    res
      .status(200)
      .json({ message: "Task deleted successfully", tasks: updatedTasks });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting task", error });
  }
};

