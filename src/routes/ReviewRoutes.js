const express = require("express");
const router = express.Router();
const {
    getReviews,
    getReview,
    createReview,
    updateReview,
    deleteReview
} = require("../controllers/ReviewController");

// Get all reviews
router.get("/", async (req, res) => {
    try {
        const reviews = await getReviews();
        res.status(200).json(reviews);
    } catch (error) {
        console.error("Error fetching reviews:", error);
        res.status(500).json({ message: "Error fetching reviews" });
    }
});

// Get a specific review by ID
router.get("/:reviewId", async (req, res) => {
    const { reviewId } = req.params;
    try {
        const review = await getReview(reviewId);
        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }
        res.status(200).json(review);
    } catch (error) {
        console.error("Error fetching review:", error);
        res.status(500).json({ message: "Error fetching review" });
    }
});

// Create a new review
router.post("/", async (req, res) => {
    const { user, event, rating, comments } = req.body;

    if (rating < 1 || rating > 10) {
        return res.status(400).json({ message: "Rating must be between 1 and 10" });
    }
    if (comments && (comments.length < 5 || comments.length > 500)) {
        return res.status(400).json({ message: "Comments must be between 5 and 500 characters" });
    }

    try {
        const newReview = await createReview({
            user,
            event,
            rating,
            comments
        });
        res.status(201).json(newReview);
    } catch (error) {
        console.error("Error creating review:", error);
        res.status(400).json({ message: "Error creating review" });
    }
});

// Update a review by ID
router.patch("/:reviewId", async (req, res) => {
    const { reviewId } = req.params;
    const { rating, comments } = req.body;

    if (rating && (rating < 1 || rating > 10)) {
        return res.status(400).json({ message: "Rating must be between 1 and 10" });
    }
    if (comments && (comments.length < 5 || comments.length > 500)) {
        return res.status(400).json({ message: "Comments must be between 5 and 500 characters" });
    }

    const updateData = {};
    if (rating) updateData.rating = rating;
    if (comments) updateData.comments = comments;

    try {
        const updatedReview = await updateReview(reviewId, updateData);

        if (!updatedReview) {
            return res.status(404).json({ message: "Review not found" });
        }

        res.status(200).json(updatedReview);
    } catch (error) {
        console.error("Error updating review:", error);
        res.status(400).json({ message: "Error updating review" });
    }
});

// Delete a review by ID
router.delete("/:reviewId", async (req, res) => {
    const { reviewId } = req.params;
    try {
        const deletedReview = await deleteReview(reviewId);
        if (!deletedReview) {
            return res.status(404).json({ message: "Review not found" });
        }
        res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {
        console.error("Error deleting review:", error);
        res.status(500).json({ message: "Error deleting review" });
    }
});

module.exports = router;