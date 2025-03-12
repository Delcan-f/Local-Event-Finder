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
        required: true
    },
});

const EventModel = mongoose.model('Event', EventSchema);

module.exports = {
    EventModel
}