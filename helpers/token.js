const jwt = require("jsonwebtoken");
const Secret_key = require("../config/variables");
function genrateAcsessToken(payload) {
  return jwt.sign(payload, Secret_key.SeCRET_JWT_KEY, { expiresIn: "1h" });
}
function checkIfTokenSentAndNotExpierd(req, res, next) {
  const token = req.headers.authorization;
  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const actualToken = token.slice(7);
  try {
    const decodedToken = jwt.verify(actualToken, Secret_key.SeCRET_JWT_KEY);
    const currentTimestamp = Math.floor(Date.now() / 1000);
    if (decodedToken.exp && decodedToken.exp > currentTimestamp) {
      next();
      req.user = decodedToken;
    }
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
}
function getpayloadInfo(token) {
  return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}

module.exports = { genrateAcsessToken, checkIfTokenSentAndNotExpierd ,getpayloadInfo};
