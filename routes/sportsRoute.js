const express = require("express");
const Upload = require("multer");
const router = express.Router();
const multer = Upload({ storage: Upload.memoryStorage() });
const parseDataMiddleware = multer.none();
const SportsController = require("../Controllers/sportsController");
const { checkIfTokenSentAndNotExpierd } = require("../helpers/token");

router.get(
  "/List-Of-Sports",
  [checkIfTokenSentAndNotExpierd],
  SportsController.listAll
);
router.get(
  "/show-sport/:id",
  [checkIfTokenSentAndNotExpierd],
  SportsController.showSport
);
router.post(
  "/recommend",
  [parseDataMiddleware, checkIfTokenSentAndNotExpierd],
  SportsController.recommendSport
);
router.delete(
  "/delete/:id",
  [parseDataMiddleware, checkIfTokenSentAndNotExpierd],
  SportsController.DeleteSport
);
router.post(
  "/Approve/:id",
  [parseDataMiddleware, checkIfTokenSentAndNotExpierd],
  SportsController.approveSport
);
router.get(
  "/my-recommends",
  [parseDataMiddleware, checkIfTokenSentAndNotExpierd],
  SportsController.myRecommendationas
);
router.post(
  "/update-sport/:id",
  [parseDataMiddleware, checkIfTokenSentAndNotExpierd],
  SportsController.updateSport
);

module.exports = router;
