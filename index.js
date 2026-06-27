 require("dotenv").config();

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const { connectToMongoDB } = require("./connect");

const URL = require("./models/url");

const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");

const { checkAuth } = require("./middlewares/auth");

const app = express();

const PORT = process.env.PORT || 8001;

// -------------------- Trust Proxy --------------------
// Required for Render/Railway and correct client IP handling
app.set("trust proxy", 1);

// -------------------- Security --------------------

app.use(
    helmet({
        contentSecurityPolicy: false, // Prevents CSP issues with EJS/CSS in production
    })
);

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: "Too many requests, please try again later.",
});

app.use(limiter);

// -------------------- Database --------------------

connectToMongoDB(process.env.MONGO_URL)
    .then(() => {
        console.log("✅ MongoDB Connected");
    })
    .catch((err) => {
        console.error("❌ MongoDB Connection Error:", err.message);
        process.exit(1);
    });

// -------------------- View Engine --------------------

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// -------------------- Middlewares --------------------

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));

app.use(checkAuth);

// -------------------- Routes --------------------

app.use("/url", urlRoute);

app.use("/user", userRoute);

app.use("/", staticRoute);

// -------------------- Redirect Route --------------------

app.get("/:shortId", async (req, res) => {
    try {
        const { shortId } = req.params;

        const entry = await URL.findOneAndUpdate(
            { shortId },
            {
                $push: {
                    visitHistory: {
                        timestamp: Date.now(),
                    },
                },
            },
            { new: true }
        );

        if (!entry) {
            return res.status(404).render("error", {
                message: "Short URL not found",
            });
        }

        return res.redirect(entry.redirectURL);
    } catch (err) {
        console.error("Redirect Error:", err);

        return res.status(500).render("error", {
            message: "Internal Server Error",
        });
    }
});

// -------------------- 404 --------------------

app.use((req, res) => {
    return res.status(404).render("error", {
        message: "Page Not Found",
    });
});

// -------------------- Global Error Handler --------------------

app.use((err, req, res, next) => {
    console.error(err.stack);

    return res.status(500).render("error", {
        message: "Something went wrong!",
    });
});

// -------------------- Server --------------------

app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});