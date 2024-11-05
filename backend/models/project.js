// models/project.js
const pool = require('../database');

const Project = {
  createTable: async () => {
    const query = `
      CREATE TABLE IF NOT EXISTS projects (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(100) NOT NULL,
        description TEXT,
        createdBy UUID REFERENCES users(id) ON DELETE SET NULL,
        status VARCHAR(50) DEFAULT 'ongoing',
        deadline DATE,
        createdAt TIMESTAMP DEFAULT NOW(),
        updatedAt TIMESTAMP DEFAULT NOW()
      );
    `;
    await pool.query(query);
  },

  createProject: async (name, description, createdBy, deadline, status) => {
    const query = `
      INSERT INTO projects (name, description, createdBy, status, deadline)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const values = [name, description, createdBy, status, deadline];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  findById: async (id) => {
    const query = `SELECT * FROM projects WHERE id = $1;`;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },

  getAllProjects: async()=>{
    const query = `SELECT * FROM projects;`;
    const result = await pool.query(query);
    return result.rows;
  },

  getProjectById: async(id) =>{
    const query = `SELECT * FROM projects WHERE id = $1;`;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },

  updateProject: async (id, name, description, status, deadline) => {
    const query = `
      UPDATE projects
      SET name = $1, description = $2, status = $3, deadline = $4, updatedAt = NOW()
      WHERE id = $5
      RETURNING *;
    `;
    const values = [name, description, status, deadline, id];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  // Delete a project by ID
  deleteProject: async (id) => {
    const query = `DELETE FROM projects WHERE id = $1 RETURNING *;`;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },

  // Add other necessary methods for the Project model
};

module.exports = Project;
