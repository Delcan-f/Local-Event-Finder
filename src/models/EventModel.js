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
        unique: true
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
        unique: false,
        required: true, 
    },
    category: {
        type: String,
        unique: false,
        value: true
    }
});

const Event = mongoose.model('Event', EventSchema);

module.exports = {
    Event
}