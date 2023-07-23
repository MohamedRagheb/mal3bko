const { UserSignIn, UserSignUp } = require("../models/userModels");

const UserController = {
  login: (req, res) => {
    UserSignIn(req, res);
    // res.json({ status: "sucess" });
  },
  signUp: (req, res) => {
    UserSignUp(req, res);
    res.json({ status: "success" });
  },
  userShow: (req, res) => {
    const { id } = req.params;
    console.log(id);
    res.json({ status: "success" });
  },
  AllUsersShow: (req, res) => {
    res.json({ status: "success" });
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
