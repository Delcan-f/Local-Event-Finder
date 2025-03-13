const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema({
    street: {
        type: String,
        required: true,
        unique: false,
        trim: true
    },
    streetNumber: {
        type: String,
        required: true,
        unique: false,
        trim: true
    },
    city: {
        type: String,
        required: true,
        unique: false,
        trim: true
    },
    state: {
        type: String,
        required: true,
        unique: false,
        trim: true
    },
    country: {
        type: String,
        required: true,
        unique: false,
        trim: true
    }
});

const Location = mongoose.model('Location', LocationSchema);

module.exports = {
    Location
}