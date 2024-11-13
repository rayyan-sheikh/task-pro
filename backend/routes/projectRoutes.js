// routes/projectRoutes.js
const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

// Route to create a new project
router.post('/projects/', projectController.createProject);

// Route to get all projects
router.get('/projects/', projectController.getAllProjects);

// Route to get a specific project by ID
router.get('/projects/:id', projectController.getProjectById);

// Route to update a specific project by ID
router.put('/projects/:id', projectController.updateProject);

// Route to delete a specific project by ID
router.delete('/projects/:id', projectController.deleteProject);

router.post('/projects/:projectId/members', projectController.addMemberToProject);

router.get('/projects/summary/:userId', projectController.fetchProjectSummary);

router.get('/projects/all/:userId', projectController.getProjectsByUseId );

module.exports = router;
