const express = require("express");
const bodyParser = require('body-parser');
// import endPoints
const login = require("./routes/login");
// Create Express app
const app = express();
// app.use(bodyParser);
app.use("/", login);
// Define API endpoints
app.use(bodyParser.json()); // Parse JSON requests
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded requests

// Start the server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
