const express = require("express");
const app = express();
const router = express.Router();
const path = require("path");

// const staticPath = path.join(__dirname);

router.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
});

router.get("/about", function (req, res) {
  res.sendFile(path.join(__dirname + "/about.html"));
});

router.get("*", function (req, res) {
  res.sendFile(path.join(__dirname + "/404.html"));
});

app.use("/", router);

app.listen(process.env.PORT || 8000, () => {
  console.log("Listening at port 8000");
});
