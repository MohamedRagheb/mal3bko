const joi = require("joi");
const connection = require("../config/db_data");
const admin = require("../config/fireBase_config.js");
// const buckt = admin.storage().bucket();
console.log(admin)
const { Storage } = require("@google-cloud/storage");
const storage = new Storage();
function UserSignIn(req, res) {
  // declare data
  const { username, password } = req.body;
  // validtion on data
  const schema = joi.object({
    username: joi.string().required().min(6).max(16),
    password: joi.string().required().alphanum().min(8),
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
      "SELECT id , nickname ,username token ,role ,favPLayGrounds ,friend_req,friends,block,intersting_pg,intersting_users,img,sports_playedF FROM users WHERE UserName = ? && password = ? ",
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
module.exports = { UserSignIn };
