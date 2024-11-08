// app.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require("dotenv").config();

// Import models
const User = require('./models/user');
const Project = require('./models/project');
const Task = require('./models/task');
const ProjectMember = require('./models/projectMember');

// Import routes
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');
const projectMemberRoutes = require('./routes/projectMemberRoutes');



// Initialize the Express application
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route for the home page
app.get('/', (req, res) => {
    res.send('Welcome to the API!');
});

// Use the user routes
app.use('/api', userRoutes);
app.use('/api', projectRoutes);
app.use('/api', taskRoutes);
app.use('/api', projectMemberRoutes);

// Function to create tables
const initializeTables = async () => {
    try {
        await User.createTable();
        await Project.createTable();
        await Task.createTable();
        await ProjectMember.createTable();
        console.log('All tables created or already exist.');
    } catch (error) {
        console.error('Error creating tables:', error);
    }
};

// Initialize tables and start the server
initializeTables().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});
