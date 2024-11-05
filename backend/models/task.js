// models/task.js
const pool = require('../database');

const Task = {
  createTable: async () => {
    const query = `
      CREATE TABLE IF NOT EXISTS tasks (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(100) NOT NULL,
        description TEXT,
        assignedTo UUID REFERENCES users(id) ON DELETE SET NULL,
        projectId UUID REFERENCES projects(id) ON DELETE CASCADE,
        status VARCHAR(50) DEFAULT 'pending',
        deadline DATE,
        createdAt TIMESTAMP DEFAULT NOW(),
        updatedAt TIMESTAMP DEFAULT NOW()
      );
    `;
    await pool.query(query);
  },

  createTask: async (name, description, assignedTo, projectId, status, deadline) => {
    const query = `
      INSERT INTO tasks (name, description, assignedTo, projectId, status, deadline)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const values = [name, description, assignedTo, projectId, status, deadline];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  findById: async (id) => {
    const query = `SELECT * FROM tasks WHERE id = $1;`;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },
  getAllTasks: async () => {
    const query = `SELECT * FROM tasks;`;
    const result = await pool.query(query);
    return result.rows;
  },

  updateTask: async (id, name, description, assignedTo, projectId, status, deadline) => {
    const query = `
      UPDATE tasks
      SET name = $1, description = $2, assignedTo = $3, projectId = $4, status = $5, deadline = $6, updatedAt = NOW()
      WHERE id = $7
      RETURNING *;
    `;
    const values = [name, description, assignedTo, projectId, status, deadline, id];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  deleteTask: async (id) => {
    const query = `DELETE FROM tasks WHERE id = $1;`;
    await pool.query(query, [id]);
  }


  // Add other necessary methods for the Task model
};

module.exports = Task;
