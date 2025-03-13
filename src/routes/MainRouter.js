const express = require("express");
const router = express.Router();

const userRouter = require("./userRouter");
const eventRouter = require("./eventRouter");
const bookingRouter = require("./bookingRouter");
const reviewRouter = require("./reviewRouter");
const locationRouter = require("./locationRouter");

router.use("/users", userRouter);
router.use("/events", eventRouter);
router.use("/bookings", bookingRouter);
router.use("/reviews", reviewRouter);
router.use("/locations", locationRouter);

router.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to the API!" });
});

//Catch-all route for undefined endpoints
router.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

module.exports = router;