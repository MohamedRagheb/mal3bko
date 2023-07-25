const joi = require("joi");
const connection = require("../config/db_data");
const { Storage } = require("@google-cloud/storage");
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
  const file = req.file;
  const storage = new Storage({
    keyFilename: "../config/mla3bko-firebase-adminsdk-khscy-6c3dcc5734.json",
  });
  let bucketName = "mla3bko";
  let filename = file
  const uploadFile = async() => {

    // Uploads a local file to the bucket
    await storage.bucket(bucketName).upload(filename, {
        // Support for HTTP requests made with `Accept-Encoding: gzip`
        gzip: true,
        // By setting the option `destination`, you can change the name of the
        // object you are uploading to a bucket.
        metadata: {
            // Enable long-lived HTTP caching headers
            // Use only if the contents of the file will never change
            // (If the contents will change, use cacheControl: 'no-cache')
            cacheControl: 'public, max-age=31536000',
        },
});

console.log(`${filename} uploaded to ${bucketName}.`);
}

uploadFile();
  const schema = joi.object({
    username: joi.string().required().min(6).max(16),
    password: joi.string().required().alphanum().min(8),
    confirmed_password: joi.any().valid(joi.ref("password")).required(),
    email: joi.string().email().required(),
    phone: joi.string().min(10).max(14).required(),
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
  // const Err = fileMetadataSchema.validate({
  //   filename: img.filename,
  //   mimetype: img.mimetype,
  //   size: img.size,
  // });
  // console.log(err.error, Err.error);
}

module.exports = { UserSignIn, UserSignUp };
