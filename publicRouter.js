const express = require("express");

const publicRouter = express.Router();

publicRouter.param("user", (req, res, next, user) => {
  req.user = user === "1" ? "Admin" : "User";
  next();
});

publicRouter.get("/:user", (req, res, next) => {
  console.log(`Public page for ${req.user}`);
  next();
});

publicRouter.get("/", (req, res) => {
  res.send("Home page");
});

publicRouter.get("/about", (req, res) => {
  res.send("About page");
});

module.exports = publicRouter;
