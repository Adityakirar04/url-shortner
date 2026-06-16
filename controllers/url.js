 const { nanoid } = require("nanoid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;

  if (!body.redirectURL) {
    return res.status(400).json({
      error: "URL is required",
    });
  }

  const shortID = nanoid(8);

  await URL.create({
    shortId: shortID,
    redirectURL: body.redirectURL,
    visitHistory: [],
    createdBy: req.user._id, // Authentication ke baad add hoga
  });

  return res.redirect("/");
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;

  const result = await URL.findOne({
    shortId,
  });

  if (!result) {
    return res.status(404).json({
      error: "URL not found",
    });
  }

  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics,
};