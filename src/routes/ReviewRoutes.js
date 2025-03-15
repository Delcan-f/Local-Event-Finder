const express = require("express");
const router = express.Router();
const {
    getReviewsForEvent,
    getReviewsForUser,
    getReview,
    createReview,
    updateReview,
    deleteReview
} = require("../controllers/ReviewController");

// Get all reviews for a specific event
router.get("/event/:eventId", getReviewsForEvent);

// Get all reviews for a specific user
router.get("/user/:userId", getReviewsForUser);

// Get a specific review by ID
router.get("/:reviewId", getReview);

// Create a new review
router.post("/", createReview);

// Update a review by ID
router.patch("/:reviewId", updateReview);

// Delete a review by ID
router.delete("/:reviewId", deleteReview);

module.exports = router;
