const mysql = require("mysql");

// // Create MySQL connection
// const connection = mysql.createConnection({
//   host: "db4free.net",
//   user: "mohamedragheb",
//   password: "moodyahmed22120014",
//   database: "mal3bko_db",
// });

// // Connect to the database
// connection.connect((err) => {
//   if (err) {
//     console.error("Error connecting to the database: ", err);
//     return;
//   }
//   console.log("Connected to the database!");
// });
// module.exports = connection;

const Sequelize = require('sequelize')
const sequelize = new Sequelize(
  "mal3bko_db",
  "mohamedragheb",
  "moodyahmed22120014",
  {
    host: "db4free.net",
    dialect: "mysql",
  }
);

module.exports = sequelize;
