const jwt = require("jsonwebtoken");
const Secret_key = require("../config/variables");
function genrateAcsessToken(payload) {
  const expiresIn = "1h";
  return jwt.sign(payload, Secret_key.SeCRET_JWT_KEY, { expiresIn: '1h'});
}
module.exports = { genrateAcsessToken };
