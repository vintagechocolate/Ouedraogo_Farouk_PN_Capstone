const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');

// Get all tasks
router.get('/', authMiddleware, taskController.getTasks);

// Create a new task
router.post('/', authMiddleware, taskController.createTask);

// Update a task
router.put('/:id', authMiddleware, taskController.updateTask);

// Delete a task
router.delete('/:id', authMiddleware, taskController.deleteTask);

module.exports = router;
