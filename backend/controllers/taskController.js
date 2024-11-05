const Task = require('../models/task');

const taskController = {
  createTask: async (req, res) => {
    try {
      const { name, description, assignedTo, projectId, status, deadline } = req.body;

      if (!name || !assignedTo || !projectId) {
        return res.status(400).json({ message: 'Name, assignedTo, and projectId are required' });
      }

      const newTask = await Task.createTask(name, description, assignedTo, projectId, status, deadline);
      res.status(201).json(newTask);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating task' });
    }
  },

  getTaskById: async (req, res) => {
    try {
      const { id } = req.params;
      const task = await Task.findById(id);

      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }

      res.status(200).json(task);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error retrieving task' });
    }
  },

  getAllTasks: async (req, res) => {
    try {
      const tasks = await Task.getAllTasks();
      res.status(200).json(tasks);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching tasks' });
    }
  },

  updateTask: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, description, assignedTo, projectId, status, deadline } = req.body;

      const updatedTask = await Task.updateTask(id, name, description, assignedTo, projectId, status, deadline);
      if (!updatedTask) {
        return res.status(404).json({ message: 'Task not found' });
      }

      res.status(200).json(updatedTask);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating task' });
    }
  },

  deleteTask: async (req, res) => {
    try {
      const { id } = req.params;

      await Task.deleteTask(id);
      res.status(204).json({ message: 'Task deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting task' });
    }
  }
};

module.exports = taskController;
