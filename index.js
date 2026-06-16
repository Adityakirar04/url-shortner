 const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

const { connectToMongoDB } = require("./connect");

const URL = require("./models/url");

const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");

const {
  checkAuth,
} = require("./middlewares/auth");

const app = express();
const PORT = 8001;

// MongoDB Connection
connectToMongoDB("mongodb://127.0.0.1:27017/short-url")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// View Engine Setup
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

// Auth Middleware
app.use(checkAuth);

// Static Files
app.use(express.static(path.resolve("./public")));

// Routes
app.use("/url", urlRoute);
app.use("/user", userRoute);
app.use("/", staticRoute);

// Redirect Route
app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;

  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );

  if (!entry) {
    return res.status(404).send("Short URL Not Found");
  }

  return res.redirect(entry.redirectURL);
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server Started at PORT ${PORT}`);
});