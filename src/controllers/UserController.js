const { User } = require('../models/UserModel')

async function getUsers() {
    try {
        const users = await User.find();
        return users;
    } catch (err) {
        console.error("Error finding users:", err);
        throw new Error("Unable to find users.")
    }
}

async function getUser(userId) {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    } catch (err) {
        console.error("error finding user:", err);
        throw new Error("Unable to find user.");
    }
};


async function createUser(user) {
    try {
        const newUser = await User.create(user);
        return newUser;
    } catch (err) {
        console.error("Error creating user:", err);
        throw new Error("Unable to create user.")
    }
};

async function updateUser(userId, user) {
    try {
        const updatedUser = await User.findByIdAndUpdate(userId, user, { new: true });
        if (!updatedUser) {
            throw new Error("User not found to update");
        }
        console.log(`User with ID ${userId} updated successfully`);
        return updatedUser;
    } catch (err) {
        console.error("Error updating user:", err);
        throw new Error("Unable to update user.");
    }
};

async function deleteUser(userId) {
    try {
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            throw new Error("User not found to delete");
        }
        console.log(`User with ID ${userId} has been deleted successfully`);
        return deletedUser;
    } catch (err) {
        console.error("Error deleting user:", err);
        throw new Error("Unable to delete user.");
    }
};

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
};
