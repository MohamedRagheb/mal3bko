// import endPoints
const express = require("express");
const userRoute = require("./routes/userRoute");
const sportsRoute = require("./routes/sportsRoute");
const playGroundRoute = require("./routes/playGroundRoute");
// const fileUpload = require('express-fileupload');
const db = require("./config/db_data");
class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}
global.CustomError = CustomError;
db.sync().then(() => {
  const app = express();


  app.use(express.urlencoded({ extended: true })); // Parse URL-encoded requests
  app.use("/users", userRoute);
  app.use("/sports", sportsRoute);
  app.use((err, req, res, next) => {
    // Extract the status code and message from the error object
    const statusCode = err.statusCode || 500;
    const errorMessage = err.message || "Internal Server Error";
    res.status(statusCode).json({
      message: errorMessage,
    });
  });
  // Start the server
  app.listen(3000, () => {
    console.log("Server started on port 3000");
  });
});
