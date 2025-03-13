const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        unique: false
    },
    lastName: {
        type: String,
        required: true,
        unique: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: false,
        minlength: 6
    },
    userLocation: {
        type: mongoose.Types.ObjectId,
        ref: 'Location',
        required: true
    },
});

UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

UserSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (err) {
        throw new Error("Password comparison failed");
    }
};

const User = mongoose.model('User', UserSchema);

module.exports = {
    User
};