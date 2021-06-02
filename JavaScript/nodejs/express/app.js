const path = require("path");
const express = require("express");
const app = express();

const staticPath = path.join(__dirname);

// Express Middleware
app.use(express.static(staticPath));

// app.get("/", (req, res) => {
//   res.send("hello world!");
// });

app.get("/test", (req, res) => {
  res.send("TEST");
});

app.use((req, res) => {
  res.status(404).send("<h1> 404 ERROR </h1>");
});

app.listen(process.env.PORT || 8000, () => {
  console.log("Listening at port 8000");
});
