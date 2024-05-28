const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const authMiddleware = require('../middleware/authMiddleware');

// Get all projects
router.get('/', authMiddleware, projectController.getProjects);

// Create a new project
router.post('/', authMiddleware, projectController.createProject);

// Update a project
router.put('/:id', authMiddleware, projectController.updateProject);

// Delete a project
router.delete('/:id', authMiddleware, projectController.deleteProject);

module.exports = router;
