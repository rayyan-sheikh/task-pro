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

// Add more API functions as needed
