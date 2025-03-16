const express = require("express");
const router = express.Router();
const User = require("../models/UserModel");
const {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
} = require("../controllers/UserController");

// Get all users
router.get("/", getUsers);

// Get one user by ID
router.get("/:userId", getUser);

// Create a new user
router.post("/", createUser);

// Update an existing user
router.patch("/:userId", updateUser);

// Delete an existing user
router.delete("/:userId", deleteUser);

module.exports = router;