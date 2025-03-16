const mongoose = require("mongoose");

async function connect() {
    let databaseUrl = "";

    switch (process.env.NODE_ENV?.toLowerCase()) {
        case "test":
            databaseUrl = "mongodb://0.0.0.0:27017/Local-Event-Finder-test";
            break;
        case "dev":
        case "development":
            databaseUrl = "mongodb://0.0.0.0:27017/Local-Event-Finder-dev";
            break;
        case "production":
        case "prod":
            databaseUrl = process.env.DATABASE_URL;
            break;
        default:
            console.error("Incorrect environment detected!");
            process.exit(1);
    }

    console.log(`Connecting to database: ${databaseUrl}`);
    
    try {
        await mongoose.connect(databaseUrl, {
        });
        console.log("Database connected successfully!");
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
}

async function disconnect() {
    await mongoose.connection.close();
    console.log("Database disconnected!");
}

module.exports = { connect, disconnect };