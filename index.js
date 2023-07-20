const express = require("express");
const bodyParser = require("body-parser");
const Upload = require('multer');
// import endPoints
const userRoute = require("./routes/userRoute.js");
const app = express();
const multer = Upload()
// Define API endpoints
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded requests
app.use(express.json()); // Parse JSON requests

// Create Express app
// app.use(bodyParser);
app.post("/user", multer.none(),(req, res) => {
  const formData = req.body;
  console.log(formData);
  res.json(formData);
});

// Start the server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
