const express = require("express");
const Upload = require("multer");
const UserController = require("../Controllers/usersControllers");
// opreate
const router = express.Router();
const multer = Upload();
router.post("/login", multer.none(),UserController.login);
router.post("/signUp", multer.none(),UserController.signUp);
router.get("/userShow/:id", multer.none(),UserController.userShow);
router.get("/AllUsersShow", multer.none(),UserController.AllUsersShow);
router.put('/EditUser/:id', multer.none(),UserController.EditUser );
router.delete('/DeleteUser/:id', multer.none(),UserController.DeleteUser );

module.exports = router;
