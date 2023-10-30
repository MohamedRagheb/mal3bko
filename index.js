// import endPoints
const express = require("express");
const userRoute = require("./routes/userRoute");
const sportsRoute = require("./routes/sportsRoute");
const playGroundRoute = require("./routes/playGroundRoute");

const sequelize = require("./config/db_data");
class CustomError extends Error {

  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}
global.CustomError = CustomError;
// db.sync().then(() => {
//   const app = express();
//
//   app.use(express.urlencoded({ extended: true })); // Parse URL-encoded requests
//   app.use("/users", userRoute);
//   app.use("/sports", sportsRoute);
//   app.use((err, req, res, next) => {
//     // Extract the status code and message from the error object
//     const statusCode = err.statusCode || 500;
//     const errorMessage = err.message || "Internal Server Error";
//     res.status(statusCode).json({
//       message: errorMessage,
//     });
//   });
//   // Start the server
//   app.listen(3000, () => {
//     console.log("Server started on port 3000");
//   });
// });
const app = express();

 async function myApp(){
  try {
       await sequelize.sync()

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
    app.listen(3000, (err) => {
      console.log("Server started on port 3000");
    });
  }catch (error){
  console.log(error)
  }
}
myApp()
module.exports = app


