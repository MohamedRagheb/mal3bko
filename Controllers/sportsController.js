const joi = require("joi");
const connection = require("../config/db_data");
const { getpayloadInfo } = require("../helpers/token");

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
    const { name, description } = req.body;
    const date = new Date();
    const token = req.headers.authorization.split(" ")[1];
    const id = getpayloadInfo(token).id;
    connection.query(
      "INSERT INTO `sports` (`name`, `created_at`,`description`,`creator_id`) VALUES (?,?,?,?);",
      [name, date, description, id],
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
  DeleteSport: (req, res) => {
    const { id } = req.params;
    const token = req.headers.authorization.split(" ")[1];
    const payLoad = getpayloadInfo(token);
    let sportData = {};
    connection.query(
      "SELECT  creator_id ,is_approved   FROM `sports` WHERE id  = ?",
      [id],
      (err, resualt) => {
        if (err) {
          throw err;
        } else {
          sportData = resualt[0];
        }
      }
    );

    const allowedRoles = ["Super Admin", "Admin"];
    if (
      (payLoad.id == sportData.creator_id && !sportData.is_approved) ||
      allowedRoles.includes(payLoad.role)
    ) {
      connection.query(
        "DELETE FROM `sports` WHERE id = ?;",
        [id],
        (err, resualt) => {
          if (err) {
            return res.status(500).json({ message: err });
          } else {
            return res
              .status(200)
              .json({ message: "Sport deleted succesfuly" });
          }
        }
      );
    } else {
      return res.status(401).json({ error: "Unauthorized" });
    }
  },
  approveSport: (req, res) => {
    const { id } = req.params;
    const token = req.headers.authorization.split(" ")[1];
    const date = new Date();
    const role = getpayloadInfo(token).role;
    const allowedRoles = ["Super Admin", "Admin"];
    if (allowedRoles.includes(role)) {
      connection.query(
        "UPDATE `sports` SET `updated_at`= ?,`is_approved`='1' WHERE  id = ?",
        [date, id],
        (err, resualt) => {
          if (err) {
            return res.status(500).json({ message: err });
          } else {
            return res
              .status(200)
              .json({ message: "Sport Approved succesfuly" });
          }
        }
      );
    } else {
      return res.status(401).json({ error: "Unauthorized" });
    }
  },
  myRecommendationas(req, res) {
    const token = req.headers.authorization.split(" ")[1];
    const payLoad = getpayloadInfo(token);
    connection.query(
      "SELECT id,name,description,icon,is_approved,updated_at,created_at FROM sports WHERE creator_id = ? ",
      [payLoad.id],
      (err, resualt) => {
        if (err) {
          return res.status(500).json({ message: err });
        } else {
          return res.status(200).json({ data: resualt });
        }
      }
    );
  },
  updateSport: (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    const token = req.headers.authorization.split(" ")[1];
    const date = new Date();
    const payLoad = getpayloadInfo(token);
    let sportData = {};
    connection.query(
      "SELECT  creator_id ,is_approved   FROM `sports` WHERE id  = ?",
      [id],
      (err, resualt) => {
        if (err) {
          throw err;
        } else {
          sportData = resualt[0];
        }
      }
    );
    const allowedRoles = ["Super Admin", "Admin"];
    if (
      (payLoad.id == sportData.creator_id && sportData.is_approved) ||
      allowedRoles.includes(payLoad.role)
    ) {
      connection.query(
        "UPDATE `sports` SET `updated_at`= ?,description = ?,`name`= ? WHERE  id = ?",
        [date, description, name, id],
        (err, resualt) => {
          if (err) {
            return res.status(500).json({ message: err });
          } else {
            return res
              .status(200)
              .json({ message: "Sport Updated succesfuly" });
          }
        }
      );
    } else {
      return res.status(401).json({ error: "Unauthorized" });
    }
  },
};
module.exports = SportsController;
