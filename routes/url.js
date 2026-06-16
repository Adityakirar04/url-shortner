 const express = require("express");

const {
  handleGenerateNewShortURL,
  handleGetAnalytics,
} = require("../controllers/url");

const {
  restrictToLoggedinUserOnly,
} = require("../middlewares/auth");

const router = express.Router();

router.post(
  "/",
  restrictToLoggedinUserOnly,
  handleGenerateNewShortURL
);

router.get(
  "/analytics/:shortId",
  handleGetAnalytics
);

module.exports = router;