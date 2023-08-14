const joi = require("joi");
const connection = require("../config/db_data");
const { genrateAcsessToken, getpayloadInfo } = require("../helpers/token");
const UserController = {
  login: (req, res) => {
    // declare data
    const { username, password } = req.body;
    // validtion on data
    const schema = joi.object({
      username: joi.string().required().min(6).max(16),
      password: joi.string().required().min(3),
    });
    const err = schema.validate(
      { username: username, password: password },
      {
        abortEarly: false,
      }
    );
    if (err.error?.details.length > 0) {
      let errMessage = [];
      for (let i = 0; i < err.error.details.length; i++) {
        errMessage.push(err.error.details[i].message);
      }
      res.json({
        Errors: errMessage,
      });
    } else {
      connection.query(
        "SELECT id FROM users WHERE UserName = ? && password = ? ",
        [username, password],
        (error, resualt) => {
          if (error) {
            res.status(500).json({ data: error });
          } else if (resualt.length > 0) {
            const { id } = resualt[0];
            const token = genrateAcsessToken({ id: id });
            connection.query(
              "UPDATE `users` SET `token` = ? WHERE `users`.`id` = ?;",
              [token, id],
              (err, resualtTokenrequest) => {
                if (err) {
                  res.status(400).json({ error: error });
                } else {
                  connection.query(
                    "SELECT id , nickname ,username ,token ,role ,favPLayGrounds ,friend_req,friends,block,intersting_pg,intersting_users,img,sports_played FROM users WHERE id = ?",
                    [id],
                    (error, resualt) => {
                      if (error) {
                        res.status(400).json({ error: error });
                      } else {
                        res.status(200).json({ data: resualt[0] });
                      }
                    }
                  );
                }
              }
            );
          } else {
            res.status(500).json({ data: "Wrong Username or Password" });
          }
        }
      );
    }
  },
  signUp: (req, res) => {
    // declare data
    const {
      username,
      password,
      confirmed_password,
      email,
      phone,
      sports_played,
    } = req.body;
    // validtion on data
    const schema = joi.object({
      username: joi.string().required().min(6).max(16),
      password: joi.string().required().min(8),
      confirmed_password: joi.any().valid(joi.ref("password")).required(),
      email: joi.string().email(),
      phone: joi.string().pattern(/^[0-9]+$/),
    });
    const err = schema.validate(
      {
        username: username,
        password: password,
        confirmed_password: confirmed_password,
        email: email,
        phone: phone,
      },
      {
        abortEarly: false,
      }
    );
    if (err.error?.details.length > 0) {
      let errMessage = [];
      for (let i = 0; i < err.error.details.length; i++) {
        errMessage.push(err.error.details[i].message);
      }
      res.json({
        Errors: errMessage,
      });
    } else {
      const keys = Object.keys(req.body);
      //appending all inputs to new object
      const newUser = {};

      keys.forEach((el) => {
        if (el != "confirmed_password") {
          newUser[el] = req.body[el];
        }
      });
      // genrate token and attach to user object
      connection.query("INSERT INTO users SET ? ", newUser, (err, success) => {
        if (err) {
          res.status(500).json({ data: err });
        } else {
          const newUserID = success.insertId;
          const token = genrateAcsessToken({ id: newUserID });
          connection.query(
            "UPDATE `users` SET `token` = ? WHERE `users`.`id` = ?;",
            [token, newUserID],
            (err, resualtTokenrequest) => {
              if (err) {
                res.status(400).json({ error: err });
              } else {
                connection.query(
                  "SELECT id , nickname ,username ,token ,role ,favPLayGrounds ,friend_req,friends,block,intersting_pg,intersting_users,img,sports_played FROM users WHERE id = ?",
                  [newUserID],
                  (error, resualt) => {
                    if (error) {
                      res.status(400).json({ error: error });
                    } else {
                      res.status(200).json({ data: resualt[0] });
                    }
                  }
                );
              }
            }
          );
        }
      });
    }
  },
  userShow: (req, res) => {
    const id = req.params.id;
    connection.query(
      "SELECT * FROM `users` WHERE id = ? ",
      id,
      (error, resualt) => {
        if (error) {
          res.status(500).json({ data: error });
        } else {
          res.status(200).json({ data: resualt });
        }
      }
    );
  },
  AllUsersShow: (req, res) => {
    connection.query(
      "SELECT  nickname ,username  ,img,sports_played FROM `users` ",
      (error, resualt) => {
        if (error) {
          res.status(500).json({ data: error });
        } else {
          res.status(200).json({ data: resualt });
        }
      }
    );
  },
  EditUser: (req, res) => {
    const userId = req.params.id;
    const sentBody = req.body;
    const token = req.headers.authorization;
    const currentUserId = getpayloadInfo(token).id;
    let newUserObj = {};
    const keyes = Object.keys(sentBody);
    keyes.forEach((e) => {
      if (e != "password" && e != "confirmed_password") {
        newUserObj[e] = sentBody[e];
      }
    });
    if (sentBody["password"]) {
      const { password, confirmed_password } = req.body;
      const schema = joi.object({
        password: joi.string().required().min(8),
        confirmed_password: joi.any().valid(joi.ref("password")).required(),
      });
      const err = schema.validate(
        {
          password: password,
          confirmed_password: confirmed_password,
        },
        {
          abortEarly: false,
        }
      );
      if (err.error) {
        return res.status(400).json({ error: err.error.details[0].message });
      } else {
        newUserObj["password"] = password;
      }
    }
    if (currentUserId == userId) {
      // core code will be here
      connection.query(
        "UPDATE `users` SET ? WHERE `users`.`id` = ?;",
        [newUserObj, userId],
        (error, success) => {
          if (error) {
            return res
              .status(500)
              .json({ Error: "Erorr While Updating User", error });
          } else {
            return res.status(200).json({ Status: "User Edited Succesfuly" });
          }
        }
      );
    } else {
      return res.status(401).json({ error: "NOT AUTHOURIEZD" });
    }
  },
  DeleteUser: (req, res) => {
    //extract user id from his token
    const token = req.headers.authorization;
    const currentUserId = getpayloadInfo(token).id;
    connection.query(
      "UPDATE `users` SET `deleted` = '1' WHERE `users`.`id` = ?",
      [currentUserId],
      (err, sucess) => {
        if (err) {
          return res.status(500).json({ Error: err });
        } else {
          return res
            .status(200)
            .json({ message: "Your Account Deleted succesfuly" });
        }
      }
    );
  },
};
module.exports = UserController;
