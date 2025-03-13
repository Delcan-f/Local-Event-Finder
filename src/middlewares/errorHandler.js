function errorHandler(err, req, res, next) {
    console.error(err.stack); // Logs the error for debugging

    const statusCode = res.statusCode === 200 ? 500 : res.statusCode; // Ensure proper error codes
    res.status(statusCode).json({
        message: err.message || "Internal Server Error",
        stack: process.env.NODE_ENV === "production" ? undefined : err.stack, // Hide stack in production
    });
}

module.exports = errorHandler;