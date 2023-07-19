const express = require("express");
// import endPoints
const login = require("./routes/login");
// Create Express app
const app = express();
// app.use(bodyParser);
app.use("/log", login);
// Define API endpoints
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded requests

// Start the server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
