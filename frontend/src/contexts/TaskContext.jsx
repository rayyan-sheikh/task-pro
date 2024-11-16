// TaskContext.js
import React, { createContext, useState } from 'react';

// Create the context
export const TaskContext = createContext();

// Create a provider to wrap around the components that need access to the context
export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const updateTaskStatus = (taskId, newStatus) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.task_id === taskId ? { ...task, task_status: newStatus } : task
      )
    );
  };

  return (
    <TaskContext.Provider value={{ tasks, updateTaskStatus }}>
      {children}
    </TaskContext.Provider>
  );
};
