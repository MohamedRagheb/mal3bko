const {UserSignIn} = require('../models/userModels')

const UserController = {
  login: (req, res) => {
    const { username, password } = req.body;
    UserSignIn(username, password , res);
    // res.json({ status: "sucess" });
  },
  signUp: (req, res) => {
    const { name, password, email, phone, confirmed_password } = req.body;
    console.log(name, password, email, phone, confirmed_password);
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
