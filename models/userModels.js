const joi = require("joi");
const connection = require("../config/db_data");

function UserSignIn(username, password, res) {
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
    console.log(err.error)
    for (let i = 0; i < err.error.details.length ; i++ ){
      // console.log(err.error.details[i].message)
      errMessage.push(err.error.details[i].message);
    } 
    res.json({
      Errors: errMessage,
    });
  } else {
    connection.query(
      "SELECT * FROM users WHERE UserName = ? && password = ? ",
      [username, password],
      (error, resualt) => {
        if (error) {
          console.log(error);
        }
        res.status(200).json({ data: resualt });
      }
    );
  }
}

module.exports = { UserSignIn };
