const joi = require("joi");
const connection = require("../config/db_data");

function UserSignIn(req, res) {
  // declare data
  const { username, password } = req.body;
  console.log(req.files)
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
      "SELECT * FROM users WHERE UserName = ? && password = ? ",
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
function UserSignUp(req, res) {
  //declare data
  const {
    username,
    password,
    confirmed_password,
    email,
    phone,
    sports_played,
  } = req.body;
  console.log(req.body)
  // validate   data
  const fileMetadataSchema = joi.object({
    filename: joi.string().required(),
    mimetype: joi.string().valid('image/jpeg', 'image/png', 'image/gif').required(),
    size: joi.number().max(5 * 1024 * 1024).required(), // Max size: 5MB
  });

  const schema = joi.object({
    username: joi.string().required().min(6).max(16),
    password: joi.string().required().alphanum().min(8),
    confirmed_password: joi.any().valid(joi.ref("password")).required(),
    email: joi.string().email().required(),
    phone: joi.string().min(10).max(14).required(),
    img: joi.required(),
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
  console.log(err);
}

module.exports = { UserSignIn, UserSignUp };
