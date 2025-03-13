const { Review } = require("../models/ReviewModel");
const { User } = require("../models/UserModel");
const { Event } = require("../models/EventModel");

// Get all reviews for a specific event
async function getReviewsForEvent(req, res, next) {
    try {
        const { eventId } = req.params;
        const reviews = await Review.find({ event: eventId })
            .populate("user")
            .populate("event");

        res.status(200).json(reviews);
    } catch (err) {
        next(err);
    }
}

// Get all reviews for a specific user
async function getReviewsForUser(req, res, next) {
    try {
        const { userId } = req.params;
        const reviews = await Review.find({ user: userId })
            .populate("user")
            .populate("event");

        res.status(200).json(reviews);
    } catch (err) {
        next(err);
    }
}

// Get a single review
async function getReview(req, res, next) {
    try {
        const { reviewId } = req.params;
        const review = await Review.findById(reviewId)
            .populate("user")
            .populate("event");

        if (!review) {
            return res.status(404).json({ error: "Review not found" });
        }

        res.status(200).json(review);
    } catch (err) {
        next(err);
    }
}

// Create a new review
async function createReview(req, res, next) {
    try {
        const { userId, eventId, rating, comments } = req.body;

        if (!userId || !eventId) {
            return res.status(400).json({ error: "User and Event IDs are required." });
        }

        const [user, event] = await Promise.all([
            User.findById(userId),
            Event.findById(eventId),
        ]);

        if (!user || !event) {
            return res.status(404).json({ error: "User or Event not found." });
        }

        const newReview = await Review.create({
            user: userId,
            event: eventId,
            rating,
            comments: comments || "",
        });

        res.status(201).json(newReview);
    } catch (err) {
        next(err);
    }
}

// Update a review
async function updateReview(req, res, next) {
    try {
        const { reviewId } = req.params;
        const { rating, comments } = req.body;

        const updatedReview = await Review.findByIdAndUpdate(
            reviewId,
            { rating, comments },
            { new: true, runValidators: true }
        );

        if (!updatedReview) {
            return res.status(404).json({ error: "Review not found" });
        }

        res.status(200).json(updatedReview);
    } catch (err) {
        next(err);
    }
}

// Delete a review
async function deleteReview(req, res, next) {
    try {
        const { reviewId } = req.params;
        const deletedReview = await Review.findByIdAndDelete(reviewId);

        if (!deletedReview) {
            return res.status(404).json({ error: "Review not found" });
        }

        res.status(200).json({ message: "Review deleted successfully" });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getReviewsForEvent,
    getReviewsForUser,
    getReview,
    createReview,
    updateReview,
    deleteReview,
};
