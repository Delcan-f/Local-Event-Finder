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
router.get('/', async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json(users);  // ✅ Use res, not response
    } catch (error) {
        res.status(500).json({ message: "Error getting users" });
    }
});

// Get one user by ID
router.get('/:userId', async (req, res, next) => {
    try {
        const user = await getUser(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: `User with ID ${req.params.userId} not found` });
        }
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

// Create a new user
router.post('/', async (req, res, next) => {
    try {
        const { firstName, lastName, email, password, userLocation } = req.body;
        
        const newUser = new User({
            firstName,
            lastName,
            email,
            password,
            userLocation
        });

        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(400).json({ message: "Error creating user." });
    }
});

// Update an existing user
router.patch("/:userId", async (req, res, next) => {
    try {
        const updatedUser = await updateUser(req.params.userId, req.body);
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
});

// Delete an existing user
router.delete('/:userId', async (req, res, next) => {
    try {
        await deleteUser(req.params.userId);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
