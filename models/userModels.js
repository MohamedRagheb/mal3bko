const joi = require("joi");
const connection = require("../config/db_data");

function UserSignIn(username, password, res) {
  // validtion on data
  const schema = joi.object({
    username: joi.string().required().min(6).max(16),
    password: joi.string().required().alphanum().min(2),
  });
  const err = schema.validate(
    { username: username, password: password },
    {
      abortEarly: false,
    }
  );
  if (err.error?.details.length > 0) {
    const errMessage = [];
    err.forEach((e) => {
      errMessage.push(e.message);
    });
    res.json({
      Errors: errMessage,
    });
  } else {
    connection.query(
      "SELECT * FROM users WHERE UserName = ? && password = ? ",
      [username, password],
        (resualt, errr) => {
          console.log(resualt)
        if (errr) {
          console.log(err);
        }
        res.json({ data: resualt });
      }
    );
  }
}

module.exports = { UserSignIn };
