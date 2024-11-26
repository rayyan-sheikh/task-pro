const pool = require('../database');

const Organization = {
  createTable: async () => {
    const query = `
      CREATE TABLE IF NOT EXISTS organizations (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(100) NOT NULL,
        about TEXT,
        createdBy UUID REFERENCES users(id) ON DELETE SET NULL,
        createdAt TIMESTAMP DEFAULT NOW(),
        updatedAt TIMESTAMP DEFAULT NOW()
      );
    `;
    await pool.query(query);
  },

  createOrganization: async (name, about, createdBy) => {
    const query = `
      INSERT INTO organizations (name, about, createdBy)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const values = [name, about, createdBy];
    try {
      const result = await pool.query(query, values);
      return result.rows[0]; // Return the created organization
    } catch (error) {
      console.error('Error creating organization:', error);
      throw new Error('Unable to create organization');
    }
  },

  findById: async (id) => {
    const query = `SELECT * FROM organizations WHERE id = $1;`;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },

  getAllOrganizations: async () => {
    const query = `SELECT * FROM organizations;`;
    const result = await pool.query(query);
    return result.rows;
  },

  updateOrganization: async (id, name, about) => {
    const query = `
      UPDATE organizations
      SET name = $1, about = $2, updatedAt = NOW()
      WHERE id = $3
      RETURNING *;
    `;
    const values = [name, about, id];
    try {
      const result = await pool.query(query, values);
      return result.rows[0]; // Return the updated organization
    } catch (error) {
      console.error('Error updating organization:', error);
      throw new Error('Unable to update organization');
    }
  },

  deleteOrganization: async (id) => {
    const query = `DELETE FROM organizations WHERE id = $1 RETURNING *;`;
    try {
      const result = await pool.query(query, [id]);
      return result.rows[0]; // Return the deleted organization
    } catch (error) {
      console.error('Error deleting organization:', error);
      throw new Error('Unable to delete organization');
    }
  },

  getOrganizationsByUserId: async (userId) => {
    const query = `
      SELECT o.*
      FROM organizations o
      WHERE o.createdBy = $1
    `;
    try {
      const result = await pool.query(query, [userId]);
      return result.rows;
    } catch (error) {
      console.error('Error fetching organizations for user:', error);
      throw new Error('Unable to fetch organizations');
    }
  },

  // Add additional organization-related methods if necessary
};

module.exports = Organization;
