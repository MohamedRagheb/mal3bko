const joi = require("joi");
const models = require("../models/init-models");
const { genrateAcsessToken, getpayloadInfo } = require("../helpers/token");
const createOtpCode = require("../utils/otpUtils.js")
const sendVerificationEmail = require("../services/emailService")
const userModel = models.users;
const rolesModel = models.roles;
const otpsModel = models.otps;

const UserController = {
  login: async (req, res) => {
    // declare data
    const {username, password} = req.body;
    try {
      const fristVersionData = await userModel.findOne({
        // res.status(400).json({message:"Email Not Verified"})
        attributes: ["id", "role","is_verified"],
        include: "roles",

        where: {username, password,is_verified:1,deleted:0},
      });

      if (fristVersionData) {
        const token = genrateAcsessToken({
          id: fristVersionData.id,
        });
        await userModel.update({token}, {where: {id: fristVersionData.id}});
        const data = await userModel.findOne({
          where: {username, password},
          include: "roles",
          attributes:["nickname","username","email","token"]
        });
        res.status(200).json({data: data});
      } else {
        res.status(400).json({message: "Wrong Email or Password "})
      }

    } catch (errors) {
      console.log(errors);
      res.status(401).json({
        message: "commonErrors.NotAuthorizedLogin.errorMessage",
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
      //appending all inputs to new object
      const newUser = {};

      keys.forEach((el) => {
        if (el != "confirmed_password") {
          newUser[el] = req.body[el];
        }
      });
      // genrate token and attach to user object
      try {
        const newUserToCreate = await userModel.create({...newUser});
        const token = genrateAcsessToken({
          id: newUserToCreate.id,
        });
        await userModel.update(
            {token},
            {where: {id: newUserToCreate.id}}
        );
        const otpCode = createOtpCode()

        await otpsModel.create({type: "email", user: newUserToCreate.id, code: otpCode})
        await sendVerificationEmail(newUser.email, otpCode, newUser.username)

        res.status(200).json({message: "Verification E-mail Sent"});
      } catch (err) {
        console.log(err);
        res.status(500).json({
          message: "commonErrors.BadRequest.errorMessage",
          error: err["errors"],
        });
      }
    }
  },
  userShow: async (req, res) => {
    const id = req.params.id;
    try {
      const data = await userModel.findOne({
        attributes: {exclude: ["password"]},
        include: "roles",
        where: {id},
      });
      res.status(200).json({data: data});
    } catch (error) {
      res.json(error);
    }
  },
  AllUsersShow: async (req, res) => {
    try {
      const data = await userModel.findAll({
        attributes: [
          "id",
          "username",
          "nickname",
          "img",
          "sports_played",
          "role",
        ],
        include: "roles",
      });
      res.status(200).json({data: data});
    } catch (err) {
      res.json({error: err});
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
      const {password, confirmed_password} = req.body;
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
        return res.status(400).json({error: err.error.details[0].message});
      } else {
        newUserObj["password"] = password;
      }
    }
    if (currentUserId == userId) {
      // core code will be here
      try {
        await userModel.update({...newUserObj}, {where: {id: userId}});
        res
            .status(200)
            .json({message: "User Updated successfully"});
      } catch (error) {
        res
            .status(500)
            .json({message: "Failed to update user data ", error: error});
      }
    } else {
      return res
          .status(401)
          .json({error: "NOT AUTHORIZED"});
    }
  },
  DeleteUser: async (req, res) => {
    //extract user id from his token
    const token = req.headers.authorization;
    const id = getpayloadInfo(token).id;
    try {
      await userModel.update({deleted: 1}, {where: {id}});
      res
          .status(200)
          .json({message: "your account has been deleted"});
    } catch (err) {
      res
          .status(500)
          .json({message: "We are unable to do that", errors: err});
    }
  },
  verifyEmail: async (req, res) => {
    try {
      const {code, email} = req.body
      const codeRowRequest = await otpsModel.findOne({
        where: {
          code
        },
        include: {
          model: userModel,
          as: "user_otp",
          attributes: ["username", "email", "is_verified"]
        }
      })
        if(codeRowRequest.isExpierd === 0){

      if (codeRowRequest.user_otp.email === email && codeRowRequest.user_otp.is_verified === 0) {
        userModel.update({is_verified: 1}, {where: {email}})
        otpsModel.update({isExpierd:1},{where:{id:codeRowRequest?.id}})
        res.status(200).json({message: "Email Verified"})
      }else {
        res.status(400).json({message:"Email Not Found or Already Verified"})
      }
        }else {
          res.status(400).json({message:"Code is In Valid "})

        }
    } catch (error) {
      console.log(error)
    }
  }
}
module.exports = UserController;
