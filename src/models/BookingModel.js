const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
    bookingUser: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true // could be false
    },
    bookingEvent: {
        type: mongoose.Types.ObjectId,
        ref: 'Event',
        required: true,
        unique: false
    },
    bookingStatus: {
        type: String, 
        required: true,
        unique: false
    }
});

const BookingModel = mongoose.model('Booking', BookingSchema);

module.exports = {
    BookingModel
}