const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema({
    street: {
        type: String,
        required: true,
        unique: false
    },
    streetNumber: {
        type: Number,
        required: true,
        unique: false
    },
    city: {
        type: String,
        required: true,
        unique: false
    },
    state: {
        type: String,
        required: true,
        unique: false
    },
    country: {
        type: String,
        required: true,
        unique: false
    }
});

const Location = mongoose.model('Location', LocationSchema);

module.exports = {
    Location
}