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
        index: true
    },
    eventLocation: {
        type: mongoose.Types.ObjectId,
        ref: 'Location',
        required: false
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        enum: ['music', 'sports', 'art', 'education', 'recreation'],
        required: true,
        trim: true,
        index: true
    }
});

const Event = mongoose.model('Event', EventSchema);

module.exports = {
    Event
};
