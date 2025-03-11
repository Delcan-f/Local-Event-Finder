// Import express to use it
const express = require("express"); 
const { default: mongoose } = require("mongoose");
const cors = require("cors")

// Creates an instance of the express server
const app = express();

app.get("/", (request, response, next) => {
    console.log("Server Starting!")
    response.json({message: "Server Started"})
})

app.listen(3000)

// // Allows us to send in JSON body data on our requests
// app.use(express.json());


module.exports = {
    app
}