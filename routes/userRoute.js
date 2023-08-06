const express = require("express");
const Upload = require("multer");
const UserController = require("../Controllers/usersControllers");
const {
  checkIfAllDataThere,
  checkIfDataLength,
} = require("../middelwares/inputsHandelar");
const errorHandelarAsMidelleWare = require("../middelwares/errorhandelars");
// opreate
const router = express.Router();
const multer = Upload({ storage: Upload.memoryStorage()});
const parseDataMiddleware = multer.none();

router.post(
  "/login",
  [parseDataMiddleware, checkIfAllDataThere, errorHandelarAsMidelleWare],
  UserController.login
);
router.post(
  "/signUp",
  multer.single("img"),
  [errorHandelarAsMidelleWare],
  UserController.signUp
);
router.get("/UserShow/:id", multer.none(), UserController.userShow);
router.get("/AllUsersShow", multer.none(), UserController.AllUsersShow);
router.put("/EditUser/:id", multer.none(), UserController.EditUser);
router.delete("/DeleteUser/:id", multer.none(), UserController.DeleteUser);

module.exports = router;
