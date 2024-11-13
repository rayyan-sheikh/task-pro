import axiosInstance from './axiosInstance';

export const getInProgressTasks = async (userId) => {
  try {
    const response = await axiosInstance.get(`/api/tasks/users/${userId}/in-progress-tasks`);
    // console.log(response.data);
    return response.data; // Return the data from the response
  } catch (error) {
    console.error('Error fetching in progress tasks:', error);
    throw error;
  }
};

export const markTaskCompleted = async (taskId) => {
    try {
      const response = await axiosInstance.put(`/api/tasks/${taskId}/status`, {
        status: 'completed',
      });
      return response.data; // Return the updated task data
    } catch (error) {
      console.error('Error marking task as completed:', error);
      throw error; // Rethrow the error for handling in the component
    }
  };

  export const getProjectSummary = async (userId) => {
    try {
      const response = await axiosInstance.get(`/api/projects/summary/${userId}`);
      return response.data; // Return the data from the response
    } catch (error) {
      console.error('Error fetching project summary:', error);
      throw error; // Rethrow the error for handling in the component
    }
  };


  export const getProjectsByUserId = async (userId) => {
    try {
      const response = await axiosInstance.get(`/api/projects/all/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching Projects by User id');
      throw error;
    }
  }

  export const createProject = async(projectData) => {
    try {
      const response = await axiosInstance.post(`/api/projects`, projectData);
      return response.data;
    } catch (error) {
      console.error('Error creating project:', error);
    throw error;
    }
  }

  export const getAllUsers = async()=>{
    try {
      const response = await axiosInstance.get('/api/users');
      return response.data
    } catch (error) {
      console.error('Error fetching Users: ', error);
      throw error;
    }
  }

  export const getUserbyId = async(userId)=>{
    try {
      const response = await axiosInstance.get(`/api/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting the user: ', error)
      throw error;
    }
  }


  export const addProjectMembers = async (userIds, projectId) => {
    try {
      // Send userIds array and role to the backend, default role is 'member'
      const response = await axiosInstance.post(`/api/project-members/${projectId}/members`, {
        userIds,
        role: 'member',
      });
  
      return response.data;
    } catch (error) {
      console.error('Error adding project members:', error);
      throw error;
    }
  };

  export const getProjectById = async(projectId)=>{
    try {
      const response = await axiosInstance.get(`/api/projects/${projectId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting this project: ', error)
      throw error;
    }
  }

  export const getTasksByProjectId = async(projectId)=>{
    try {
      const response = await axiosInstance.get(`/api/tasks/project/${projectId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting tasks: ', error)
      throw error;
    }
  }
 