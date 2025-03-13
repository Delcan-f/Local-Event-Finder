const { User } = require('../models/UserModel')

async function getUsers() {
    const users = await User.find()
    return users
};

async function getUser(userId) {
    const user = await User.findById(userId)
    return user
};

async function createUser(user) {
    const newUser = await User.create(user)
    return newUser
};

async function updateUser(userId, user) {
    const updatedUser = await User.findByIdAndUpdate(userId, user, { new: true })
    return updatedUser
};

async function deleteUser(userId) {
    const deletedUser = await User.findByIdAndDelete(userId)
    return deletedUser
};

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
};

