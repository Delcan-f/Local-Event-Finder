const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        required: true,
        index: true // Index for faster queries
    },
    eventLocation: {
        type: mongoose.Types.ObjectId,
        ref: 'Location',
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0 // Ensuring price is not negative
    },
    category: {
        type: String,
        enum: ['music', 'sports', 'art', 'education', 'recreation'],
        required: true,
        trim: true,
        index: true // Useful for filtering events by category
    }
});

const Event = mongoose.model('Event', EventSchema);

module.exports = {
    Event
};
