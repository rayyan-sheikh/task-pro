const express = require('express');
const router = express.Router();
const projectMemberController = require('../controllers/projectMemberController');

// Route to add a new member to a project
router.post('/add', projectMemberController.addMember);

// Route to remove a member from a project
router.delete('/:projectId/:userId', projectMemberController.removeMember);

// Route to edit a member's role in a project
router.put('/:projectId/:userId', projectMemberController.editMember);

// Route to list all members in a project
router.get('/:projectId', projectMemberController.listMembers);

module.exports = router;
