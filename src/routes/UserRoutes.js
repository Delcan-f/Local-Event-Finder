const express = require("express");
const router = express.Router();
const {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
} = require("../controllers/UserController");

// Get all users
router.get('/', async (request, response) => {
    try {
        const users = await getUsers();
        response.status(200).json(users);
    } catch (error) {
        console.error("Error getting users:", error);
        response.status(500).json({message: "Error getting users"});
    }
});

// Get one user using userId
router.get('/:userId', async (request, response) => {
    const { userId } = request.params;
    try {
        const user = await getUser(userId);
        if (!user) {
            return response.status(404).json({message: `User with id ${userId} not found`});
        }
        response.status(200).json(user);
    } catch (error) {
        console.error("Error finding user:", error);
        response.status(500).json({message: "Error getting user"});
    }
});

// Create new user
router.post('/', async (request, response) => {
    const {
        firstName,
        lastName,
        email,
        password,
        userLocation
    } = request.body;

    try {
        const newUser = await createUser({
            firstName,
            lastName,
            email,
            password,
            userLocation,
        });
        response.status(201).json(newUser);
    } catch (error) {
        console.error("Error creating new user:", error);
        response.status(400).json({message: "Error creating new user."});
    }
});

// Update existing user
router.patch("/:userId", async (request, response) => {
    const { userId } = request.params;
    const { 
        firstName,
        lastName,
        email,
        password,
        userLocation
    } = request.body;

    const updateData = {};
    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;
    if (email) updateData.email = email;
    if (password) updateData.password = password;
    if (userLocation) updateData.userLocation = userLocation;

    try {
        const updatedUser = await updateUser(userId, updateData);

        if (!updatedUser) {
            return response.status(404).json({message: "Unable to find user"});
        }

        response.status(200).json(updatedUser);
    } catch (error) {
        console.error("Error updating user:", error);
        response.status(400).json({message: "Error updating user"});
    }
});

// Delete existing user
router.delete('/:userId', async (request, response) => {
    const { userId } = request.params;
    try {
        const deletedUser = await deleteUser(userId);
        if (!deletedUser) {
            return response.status(404).json({message: "Unable to find user"});
        }
        response.status(200).json({ message: "User deleted successfully"});
    } catch (error) {
        console.error("Error deleting user:", error);
        response.status(500).json({message: "Error deleting user"});
    }
});

module.exports = router;