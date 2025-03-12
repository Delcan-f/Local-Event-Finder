const mongoose = require("mongoose");

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
        minLength: 6
    },
    userLocation: {
        type: mongoose.Types.ObjectId,
        ref: 'Location',
        required: true
    },
     price: {
        type: Number,
        get: v => (v/100).toFixed(2),
        set: v => v*100
     },
     category: {
        type: String,
        unique: false,
        required: true
     }
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = {
    UserModel
}