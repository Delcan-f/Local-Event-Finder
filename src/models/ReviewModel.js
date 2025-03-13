const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: false
    },
    event: {
        type: mongoose.Types.ObjectId,
        ref: 'Event',
        required: true,
        unique: false
    },
    rating: {
        type: Number,
        min: [1, 'Rating cannot be less than 1'],
        max: [10, 'Rating cannot go higher than 10'],
        required: true,
        unique: false
    },
    comments: {
        type: String,
        minlength: [5, 'Comments must be at least 5 characters long'],
        maxlength: [500, 'Comments cannot be longer than 500 characters'],
        unique: false
    }
});

const Review = mongoose.model('Review', ReviewSchema);

module.exports = {
    Review
};