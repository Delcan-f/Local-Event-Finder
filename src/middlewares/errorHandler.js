function errorHandler(err, req, res, next) {
    console.error(err.stack);

    const statusCode = res.statusCode === 200 ? 500 : res.statusCode; 
    res.status(statusCode).json({
        message: err.message || "Internal Server Error",
        stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
    });
}

module.exports = errorHandler;