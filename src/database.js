const mongoose = require("mongoose");

async function connect(databaseURL){
    console.log("Database connecting to " + databaseURL);
    await mongoose.connect(databaseURL);
    console.log("Database connected!");
}

async function disconnect(){
    awaitmongoose.connection.close()
}

module.exports = {
    connect, disconnect
}