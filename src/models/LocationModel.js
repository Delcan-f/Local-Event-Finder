const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema({
    street: {
        type: String,
        required: true,
        trim: true
    },
    streetNumber: {
        type: String,
        required: true,
        trim: true
    },
    city: {
        type: String,
        required: true,
        trim: true
    },
    state: {
        type: String,
        required: true,
        trim: true
    },
    country: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true });

const Location = mongoose.model('Location', LocationSchema);

module.exports = {
    Location
};
