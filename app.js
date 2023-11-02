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
const app = express();
sequelize.authenticate().then(() => {


  console.log("db auth done")

}).catch((error)=>{
  console.log(error)
})
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
const Port = process.env.PORT || 3000
app.listen(Port, (err) => {
  console.log("Server started on port : ",Port);
});
module.exports = app
