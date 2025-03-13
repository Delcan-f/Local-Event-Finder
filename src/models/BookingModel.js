const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
    bookingUser: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: false 
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

const Booking = mongoose.model('Booking', BookingSchema);

module.exports = {
    Booking
}