// controllers/userController.js
const User = require('../models/user');

const userController = {
  createUser: async (req, res) => {
    try {
      const { name, password, email, profilePicUrl } = req.body;

      // Check if all required fields are provided
      if (!name || !password || !email) {
        return res.status(400).json({ message: 'Name, password, and email are required' });
      }

      const existingUser = await User.getUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists with this email' });
    }

      // Call the User model's createUser method
      const newUser = await User.createUser(name, password, email, profilePicUrl);

      // Return the created user's data
      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating user' });
    }
  },

  getAllUsers: async(req, res) => {
    try{
        const users = await User.getAllUsers();
        res.status(200).json(users)
    } catch(error){
        console.error(error);
        res.status(500).json({message : 'Error fetching users'})
    }
  },


  getUserById: async(req, res)=>{
    try {
        const {id} = req.params;
        const user = await User.getUserById(id);
        if(!user){
            res.status(404).json({message : 'User not found'});
        }
        res.status(200).json(user);

    } catch (error) {
        console.error(error);
      res.status(500).json({ message: 'Error fetching user' });
    }
  },

  updateUser: async(req, res)=>{
    try {
        const { id } = req.params;
        const updates = req.body;
        const updatedUser = await User.updateUser(id, updates);
        if (!updatedUser) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(updatedUser);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating user' });
      }
  },

  deleteUser: async(req, res) =>{
    try {
        const { id } = req.params;
        const deletedUser = await User.deleteUser(id);
        if (!deletedUser) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully', id: deletedUser.id });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting user' });
      }
  },
};

module.exports = userController;
