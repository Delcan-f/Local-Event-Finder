const User = require("../models/UserModel");

// Get all users
const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Error fetching users." });
    }
};

// Get a single user by ID
const getUser = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: `User with ID ${userId} not found.` });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "Error fetching user." });
    }
};

// Create a new user
const createUser = async (req, res) => {
    try {
        console.log("Request Body:", req.body); // Debugging
        const { firstName, lastName, email, password, userLocation } = req.body;

        // Validate required fields
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ message: "All fields are required: firstName, lastName, email, and password." });
        }

        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use. Please use a different email." });
        }

        // Create new user
        const newUser = await User.create({ firstName, lastName, email, password, userLocation });

        res.status(201).json(newUser);
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Error creating user." });
    }
};

// Update an existing user
const updateUser = async (req, res) => {
    const { userId } = req.params;
    const { firstName, lastName, email, password, userLocation } = req.body;

    if (!firstName && !lastName && !email && !password && !userLocation) {
        return res.status(400).json({ message: "At least one field must be provided for an update." });
    }

    const updateData = {};
    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;
    if (email) updateData.email = email;
    if (password) updateData.password = password;
    if (userLocation) updateData.userLocation = userLocation;

    try {
        const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: `User with ID ${userId} not found.` });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Error updating user." });
    }
};

// Delete an existing user
const deleteUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ message: `User with ID ${userId} not found.` });
        }
        res.status(200).json({ message: "User deleted successfully." });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Error deleting user." });
    }
};

module.exports = { getUsers, getUser, createUser, updateUser, deleteUser };
