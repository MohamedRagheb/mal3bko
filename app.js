// import endPoints
const express = require("express");
const userRoute = require("./routes/userRoute");
const sportsRoute = require("./routes/sportsRoute");
// const fileUpload = require('express-fileupload');
const db = require("./config/db_data");

  db.sync().then(() => {
    const app = express();

    app.use(express.urlencoded({ extended: true })); // Parse URL-encoded requests
    app.use(express.json()); // Parse JSON requests
    // app.use(fileUpload())
    // Define API endpoints
    app.use("/users", userRoute);
    app.use("/sports", sportsRoute);

    // Start the server
    app.listen(3000, () => {
      console.log("Server started on port 3000");
    });
  });

