const Project = require("../models/project");
const ProjectMember = require('../models/projectMember');

const projectController = {

  createProject: async (req, res) => {
    try {
      const { name, description, createdBy, deadline, status } = req.body;
      if (!name || !description || !createdBy) {
        return res
          .status(400)
          .json({ message: "Name, description, and createdBy are required" });
      }
      const newProject = await Project.createProject(
        name,
        description,
        createdBy,
        deadline,
        status
      );
      await ProjectMember.addMember(createdBy, newProject.id, 'admin');
      res.status(201).json(newProject);
    } catch (error) {
        console.error(error);
      res.status(500).json({ message: 'Error creating project' });
    }
  },

  addMemberToProject: async (req, res) => {
    try {
      const { userId, projectId, role } = req.body;
  
      // Check if the user and project exist
      const project = await Project.findById(projectId);
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
  
      // Add the member to the project
      const newMember = await ProjectMember.addMember(userId, projectId, role);
  
      res.status(201).json(newMember);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error adding member to project' });
    }
  },

  getAllProjects: async (req, res) => {
    try {
      const projects = await Project.getAllProjects();
      res.status(200).json(projects);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error retrieving projects' });
    }
  },

  getProjectById: async (req, res) => {
    try {
      const { id } = req.params;
      const project = await Project.getProjectById(id);

      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }

      res.status(200).json(project);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error retrieving project' });
    }
  },

  updateProject: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, description, status, deadline } = req.body;

      const updatedProject = await Project.updateProject(id, name, description, status, deadline);

      if (!updatedProject) {
        return res.status(404).json({ message: 'Project not found' });
      }

      res.status(200).json(updatedProject);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating project' });
    }
  },

  deleteProject: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedProject = await Project.deleteProject(id);

      if (!deletedProject) {
        return res.status(404).json({ message: 'Project not found' });
      }

      res.status(200).json({ message: 'Project deleted successfully', project: deletedProject });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting project' });
    }
  }
};


module.exports = projectController;
