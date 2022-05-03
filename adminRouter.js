const express = require("express");

const adminRouter = express.Router();

adminRouter.get("/:user", (req, res) => {
  res.send(`Admin dashboard for ${req.params.user} ${req.user}`);
});

adminRouter.get("/about", (req, res) => {
  res.send("About page");
});

module.exports = adminRouter;
