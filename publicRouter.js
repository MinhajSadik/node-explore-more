const express = require("express");

const publicRouter = express.Router();

// publicRouter.param("user", (req, res, next, user) => {
//   req.user = user === "1" ? "Admin" : "User";
//   next();
// });

publicRouter.param((param, option) => (req, res, next, val) => {
  if (val === option) {
    next();
  } else {
    res.sendStatus(403);
  }
});

publicRouter.param("user", "1");

publicRouter
  .route("/user")
  .all((req, res, next) => {
    console.log(`i'm logging all requests`);
    next();
  })
  .get((req, res) => {
    res.send(`Hello`);
  })
  .post((req, res) => {
    res.send(`Hello`);
  })
  .put((req, res) => {
    res.send(`Hello`);
  });

//public router methods
publicRouter.get("/:user", (req, res, next) => {
  console.log(`Hello ${req.user}`);
  next();
});

publicRouter.get("/", (req, res) => {
  res.send("Home page");
});

publicRouter.get("/about", (req, res) => {
  res.send("About page");
});

module.exports = publicRouter;
