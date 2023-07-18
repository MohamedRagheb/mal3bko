const express = require("express");
// data base
// const connection = require("./config/db_data");
// import endPoints
const login = require("./routes/login");
// Create Express app
const app = express();
app.use("/",login)
// Define API endpoints


// Start the server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
