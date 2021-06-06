import express from "express";

import usersRoutes from "./routes/users.js";

const app = express();
const PORT = 5000;

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded());

app.use("/user", usersRoutes);
app.get("/", (req, res) => res.send("Welcome to the Users API!"));
app.all("*", (req, res) =>
  res.send("You've tried reaching a route that doesn't exist.")
);

app.listen(PORT, () =>
  console.log(`Server running on port: http://localhost:${PORT}`)
);
