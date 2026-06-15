 const express = require("express");
const { connectToMongoDB } = require("./connect");
const urlRoute = require("./routes/url");

const {
  handleRedirectURL,
} = require("./controllers/url");

const app = express();

connectToMongoDB("mongodb://127.0.0.1:27017/short-url")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server Running");
});

app.use("/url", urlRoute);

app.get("/:shortId", handleRedirectURL);

app.listen(8001, () => {
  console.log("Server Started at PORT 8001");
});