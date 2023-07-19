const express = require("express");
// const connection = require("../config/db_data");
const { loginUser } = require('../control/loginControl');
const router = express.Router();


router.post("/",loginUser);

module.exports = router;
