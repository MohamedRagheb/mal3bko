const joi = require("joi");
// const connection = require("../config/db_data");
const models = require("../models/init-models");
const { genrateAcsessToken, getpayloadInfo } = require("../helpers/token");
const commonErrors = require("../helpers/errors.js");
const userModel = models.users;
const rolesModel = models.roles;
const {
  getAlldataFromModal,
  findOneFromModel,
  updateRowInModal,
  createRowInModal,
} = require("../helpers/modelsHelpars");
const UserController = {
  login: async (req, res) => {
    // declare data
    const { username, password } = req.body;
    try {
      const fristVersionData = await findOneFromModel(
        "users",
        null,
        ["id", "role"],
        null,
        { username, password }
      );
      const token = genrateAcsessToken({
        id: fristVersionData.id,
        role: fristVersionData.role,
      });
      await updateRowInModal("users", { token }, { id: fristVersionData.id });
      const data = await findOneFromModel(
        "users",
        ["roles", "sports"],
        null,
        "password",
        {
          id: fristVersionData.id,
        }
      );
      res.status(commonErrors.Success.errorCode).json({ data: data });
    } catch (errors) {
      console.log(errors);
      res.status(commonErrors.NotAuthorizedLogin.errorCode).json({
        message: commonErrors.NotAuthorizedLogin.errorMessage,
        errors: errors,
      });
    }
  },

  signUp: async (req, res) => {
    // declare data in db
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
      const newUser = {};

      keys.forEach((el) => {
        if (el != "confirmed_password") {
          newUser[el] = req.body[el];
        }
      });
      // genrate token and attach to user object
      try {
        const newUserToCreate = await createRowInModal("users", { ...newUser });
        const token = genrateAcsessToken({
          id: newUserToCreate.id,
        });
        await userModel.update(
          { token },
          { where: { id: newUserToCreate.id } }
        );
        const data = await userModel.findOne({
          attributes: { exclude: ["password"] },
          where: { id: newUserToCreate.id },
        });
        res.status(commonErrors.Success.errorCode).json({ data: data });
      } catch (err) {
        console.log(err);
        res.status(commonErrors.BadRequest.errorCode).json({
          message: commonErrors.BadRequest.errorMessage,
          error: err,
        });
      }
    }
  },
  userShow: async (req, res) => {
    const id = req.params.id;
    try {
      const data = await userModel.findOne({
        attributes: { exclude: ["password"] },
        include: "roles",
        where: { id },
      });
      res.status(commonErrors.Success.errorCode).json({ data: data });
    } catch (error) {
      res.json(error);
    }
  },
  AllUsersShow: async (req, res) => {
    try {
      const data = await getAlldataFromModal("users", null, null, [
        "password",
        "intersting_pg",
        "intersting_users",
        "block",
        "friends",
        "deleted",
        "token",
        "role",
      ]);
      res.status(commonErrors.Success.errorCode).json({ data: data });
    } catch (err) {
      console.log(err);
      res.json({ error: err });
    }
  },
  EditUser: async (req, res) => {
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
      try {
        await updateRowInModal("users", { ...newUserObj }, { id: userId });
        res
          .status(commonErrors.Success.errorCode)
          .json({ message: "User Updated successfully" });
      } catch (error) {
        res
          .status(commonErrors.BadRequest.errorCode)
          .json({ message: "Faild to update user data ", error: error });
      }
    } else {
      return res
        .status(commonErrors.NotAuthorized.errorCode)
        .json({ error: "NOT AUTHOURIEZD" });
    }
  },
  DeleteUser: async (req, res) => {
    //extract user id from his token
    const token = req.headers.authorization;  
    const id = getpayloadInfo(token).id;
    try {
      await updateRowInModal("users", { deleted: 1 }, { id });
      res
        .status(commonErrors.Success.errorCode)
        .json({ message: "your account has been deleted" });
    } catch (err) {
      res
        .status(commonErrors.BadRequest.errorCode)
        .json({ message: "We are unable to do that", errors: err });
    }
  },
};
module.exports = UserController;
