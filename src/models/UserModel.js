const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, "Invalid email format"]
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    userLocation: {
        type: mongoose.Types.ObjectId,
        ref: 'Location',
        required: true
    },
});

// Hash password before saving
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        console.error("Error hashing password:", err);
        next(err);
    }
});

// Compare stored password with login attempt
UserSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (err) {
        console.error("Password comparison error:", err);
        throw new Error("Password comparison failed");
    }
};

const User = mongoose.model('User', UserSchema);

module.exports = { User };
