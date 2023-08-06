const joi = require("joi");
const connection = require("../config/db_data");
function UserSignIn(req, res) {
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
      "SELECT id , nickname ,username token ,role ,favPLayGrounds ,friend_req,friends,block,intersting_pg,intersting_users,img,sports_played FROM users WHERE UserName = ? && password = ? ",
      [username, password],
      (error, resualt) => {
        if (error) {
          res.status(500).json({ data: error });
        } else if (resualt.length > 0) {
          res.status(200).json({ data: resualt });
        } else {
          res.status(500).json({ data: "Wrong Username or Password" });
        }
      }
    );
  }
}
function AllUsersShow(req, res) {
  connection.query("SELECT * FROM `users` ", (error, resualt) => {
    if (error) {
      res.status(500).json({ data: error });
    } else {
      res.status(200).json({ data: resualt });
    }
  });
}
function UserSignUp(req, res) {
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
    const newUser = { username, password };
    connection.query("INSERT INTO users SET ?", newUser, (err, success) => {
      if (err) {
        res.status(500).json({ data: err });
      }
      res.status(200).json({ data: "User Added Sucess" });
    });
  }
}
function ShowUser(req, res) {
  const id = req.params.id
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
}

module.exports = { UserSignIn, UserSignUp, AllUsersShow, ShowUser };
