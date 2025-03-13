const dotenv = require("dotenv");
dotenv.config();

const { app } = require("./server");

const PORT = process.env.PORT || 3000;
const ENV = process.env.NODE_ENV || "development";

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} in ${ENV} mode`);
});