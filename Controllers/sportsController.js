const joi = require("joi");
const connection = require("../config/db_data");
const SportsController = {
  listAll: (req, res) => {
    connection.query("SELECT * FROM `sports`", (err, resualt) => {
      if (err) {
        return res.status(500).json("Server Error");
      } else {
        return res.status(200).json({ data: resualt });
      }
    });
  },
  showSport: (req, res) => {
    const id = req.params.id;
    connection.query(
      "SELECT * FROM `sports` WHERE id  = ?",
      [id],
      (err, resualt) => {
        if (err) {
          return res.status(500).json("Server Error");
        } else {
          if (resualt.length == 0) {
            return res.status(200).json({ message: "Not Found" });
          }
          return res.status(200).json({ data: resualt });
        }
      }
    );
  },
  recommendSport: (req, res) => {
    const { name } = req.body;
    const date = new Date();
    connection.query(
      "INSERT INTO `sports` (`name`, `created_at`) VALUES (?,?);",
      [name, date],
      (err, resualt) => {
        if (err) {
          return res.status(500).json({ message: err });
        } else {
          return res
            .status(200)
            .json({ message: "Adding Sport request succesfuly" });
        }
      }
    );
  },
};
module.exports = SportsController;
