const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
    bookingUser: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    bookingEvent: {
        type: mongoose.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    bookingStatus: {
        type: String,
        required: true,
        enum: ['pending', 'confirmed', 'cancelled'] // Example for enum validation
    }
}, {
    timestamps: true // Optional: Adds createdAt and updatedAt fields automatically
});

// Optional: Add indexes to improve performance on common queries
BookingSchema.index({ bookingUser: 1, bookingEvent: 1 });

const Booking = mongoose.model('Booking', BookingSchema);

module.exports = {
    Booking
};