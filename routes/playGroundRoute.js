const express = require("express");
const Upload = require("multer");
const router = express.Router();
const multer = Upload({ storage: Upload.memoryStorage() });
const parseDataMiddleware = multer.none();
const playgroundController = require("../Controllers/playgroundController");
const { checkIfTokenSentAndNotExpierd } = require("../helpers/token");

router.get(
  "/list-of-playGrounds",
  [checkIfTokenSentAndNotExpierd],
  playgroundController.getAll
);
module.exports = router;
