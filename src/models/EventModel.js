const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: false
    },
    description: {
        type: String,
        required: true,
        unique: false
    },
    date: {
        type: Date,
        required: true,
        unique: false
    },
    eventLocation: {
        type: mongoose.Types.ObjectId,
        ref: 'Location',
        required: true,
        unique: false
    },
    price: {
        type: Number,
        required: true,
        unique: false
    },
    category: {
        type: String,
        enum: ['music', 'sports', 'art', 'education', 'recreation'],
        required: true,
        unique: false
    }
});

const Event = mongoose.model('Event', EventSchema);

module.exports = {
    Event
};