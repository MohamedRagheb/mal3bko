// import endPoints
const express = require("express");
const userRoute = require("./routes/userRoute");
// const fileUpload = require('express-fileupload');
const app = express();
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded requests
app.use(express.json()); // Parse JSON requests
// app.use(fileUpload())
// Define API endpoints
app.use("/users", userRoute);


// Start the server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
