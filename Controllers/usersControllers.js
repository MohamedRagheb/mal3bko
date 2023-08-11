const {
  UserSignIn,
  UserSignUp,
  AllUsersShow,
  ShowUser,
} = require("../models/userModels");

const UserController = {
  login: (req, res) => {
    UserSignIn(req, res);
    // res.json({ status: "sucess" });
  },
  signUp: (req, res) => {
    UserSignUp(req, res);
    // res.json({ status: "success" });
  },
  userShow: (req, res) => {
    ShowUser(req, res);
  },
  AllUsersShow: (req, res) => {
    AllUsersShow(req, res);
  },
  EditUser: (req, res) => {
    const { id } = req.params;
    console.log(id);
    res.json({ status: "success" });
  },
  DeleteUser: (req, res) => {
    const { id } = req.params;
    console.log(id);
    res.json({ status: "success" });
  },
};
module.exports = UserController;
