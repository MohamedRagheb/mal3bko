const joi = require("joi");
const connection = require("../config/db_data");
const { getpayloadInfo } = require("../helpers/token");

const palayGroundontroller = {
  getAll: async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const { id } = getpayloadInfo(token);
    let blocked = [];
    try {
      const data = await connection.execute(
        "SELECT * FROM `blockedPalyground_user_relation` WHERE user_id = ?",
        [id]
      );
      console.log(data);
    } catch (errr) {
      console.log(errr);
    }
  },
};
module.exports = palayGroundontroller;
