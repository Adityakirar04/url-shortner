 const { nanoid } = require("nanoid");
const validator = require("validator");

const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
    try {
        let { redirectURL } = req.body;

        if (!redirectURL) {
            return res.status(400).json({
                error: "URL is required",
            });
        }

        redirectURL = redirectURL.trim();

        // Automatically add https:// if missing
        if (
            !redirectURL.startsWith("http://") &&
            !redirectURL.startsWith("https://")
        ) {
            redirectURL = "https://" + redirectURL;
        }

        // Validate URL
        if (!validator.isURL(redirectURL)) {
            return res.status(400).json({
                error: "Please enter a valid URL",
            });
        }

        // Check if same URL already exists for this user
        const existingURL = await URL.findOne({
            redirectURL,
            createdBy: req.user._id,
        });

        if (existingURL) {
            return res.redirect("/");
        }

        const shortID = nanoid(8);

        await URL.create({
            shortId: shortID,
            redirectURL,
            visitHistory: [],
            createdBy: req.user._id,
        });

        return res.redirect("/");
    } catch (err) {
        console.error("Generate URL Error:", err);

        return res.status(500).json({
            error: "Internal Server Error",
        });
    }
}

async function handleGetAnalytics(req, res) {
    try {
        const { shortId } = req.params;

        const result = await URL.findOne({ shortId });

        if (!result) {
            return res.status(404).json({
                error: "URL not found",
            });
        }

        return res.status(200).json({
            totalClicks: result.visitHistory.length,
            analytics: result.visitHistory,
        });
    } catch (err) {
        console.error("Analytics Error:", err);

        return res.status(500).json({
            error: "Internal Server Error",
        });
    }
}

module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics,
};