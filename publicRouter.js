const express = require("express");

const publicRouter = express.Router();

publicRouter.get("/", (req, res) => {
  res.send("Home page");
});

publicRouter.get("/about", (req, res) => {
  res.send("About page");
});

module.exports = publicRouter;
