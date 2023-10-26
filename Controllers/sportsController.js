const joi = require("joi");
const connection = require("../config/db_data");
const { getpayloadInfo } = require("../helpers/token");
const { sports, users } = require("../models/init-models");
const { async } = require("@firebase/util");

const SportsController = {
  listAll: async (req, res, next) => {
    try {
      const data = await sports.findAll({
        attributes: {
          exclude: ["is_approved", "updatedAt", "createdAt", "creator_id"],
        },
        where: { is_approved: 1, deleted: 0 },
      });
      res.status(200).json({ data });
    } catch (err) {
      console.log(err);
      const error = new CustomError(err, 200);
      next(error);
    }
  },
  showSport: async (req, res, next) => {
    try {
      const id = req.params.id;
      const data = await sports.findOne({
        attributes: {
          exclude: ["createdAt", "updatedAt", "creator_id", "is_approved"],
        },
        include: [
          { model: users, as: "creator", attributes: ["username", "id"] },
        ],
        where: { id },
      });
      res.status(200).json({ data });
    } catch (err) {
      const error = new CustomError(err, 500);
      next(error);
    }
  },
  recommendSport: async (req, res, next) => {
    try {
      const { name, description } = req.body;
      const date = new Date();
      const token = req.headers.authorization.split(" ")[1];
      const id = getpayloadInfo(token).id;
      const request = await sports.create({
        name,
        description,
        creator_id: id,
      });
      res.status(200).json({ message: "Sport Recommeded Successfully" });
    } catch (err) {
      console.log(err);
      const error = new CustomError(err, 500);
      next(error);
    }
  },
  DeleteSport: async (req, res, next) => {
    try {
      const { id } = req.params;
      const token = req.headers.authorization.split(" ")[1];
      const payLoad = getpayloadInfo(token);
      const data = await sports.findOne({
        where: { id },
      });
      if (!data) {
        res.status(404).json({ message: "No sport with this id" });
      }
      const allowedRoles = ["Super Admin", "Admin"];

      if (
        (payLoad.id == data.creator_id && !data.is_approved) ||
        allowedRoles.includes(payLoad.role)
      ) {
        const request = await sports.update({ deleted: 1 }, { where: { id } });
      } else {
        return res.status(401).json({ error: "Unauthorized" });
      }
    } catch (err) {
      console.log(err);
      const error = new CustomError(err, 500);
      next(error);
    }
  },
  approveSport: async (req, res) => {
    try {
      const { id } = req.params;
      const token = req.headers.authorization.split(" ")[1];
      const date = new Date();
      const role = getpayloadInfo(token).role;
      const allowedRoles = [1];
      if (allowedRoles.includes(role)) {
        const request = await sports.update(
          { is_approved: 1 },
          { where: { id } }
        );
        res.status(200).json({ message: "Sport Approved Successfully" });
      } else {
        const error = new CustomError("Unauthorized ", 401);
        next(error);
      }
    } catch (err) {
      const error = new CustomError(err, 500);
      next(error);
    }
  },
  myRecommendationas(req, res) {
    const token = req.headers.authorization.split(" ")[1];
    const payLoad = getpayloadInfo(token);
    connection.query(
      "SELECT id,name,description,icon,is_approved FROM sports WHERE creator_id = ? ",
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
