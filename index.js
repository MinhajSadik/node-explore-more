const express = require("express");
const { handler, routerPost, routerGet, routerAll } = require("./helpers");
const cookieParser = require("cookie-parser");
// const adminRouter = require("./adminRouter");
const publicRouter = require("./publicRouter");

// Create an express app
const app = express();
//sub-app
const admin = express();
const adminRouter = express.Router();

app.use("/admin", adminRouter);
app.use("/public", publicRouter);

const myMiddleware = (req, res, next) => {
  console.log("myMiddleware");
  next();
};

const loggerWrapper = (options) => {
  return function (req, res, next) {
    if (options.log) {
      console.log(
        `${new Date(Date.now()).toLocaleString()} ${req.method} ${
          req.originalUrl
        } ${req.ip}`
      );
      next();
    } else {
      throw new Error("log: failed to log");
    }
  };
};

const logger = (req, res, next) => {
  console.log(
    `${new Date(Date.now()).toLocaleString()} ${req.method} ${
      req.originalUrl
    } ${req.ip}`
  );
  // res.end(); // we can call res.end
  // next("error"); // if we give value in next then it will assume as error
  // throw new Error("error");
  next();
};

app.use(myMiddleware);
adminRouter.use(loggerWrapper({ log: true }));

adminRouter.get("/dashboard", (req, res) => {
  // console.log(req.baseUrl);
  // console.log(req.originalUrl);
  res.send("Admin dashboard in index.js");
});

app.set("view engine", "ejs");
app.locals.title = "My App";
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

//raw: we'll get buffer binary data, we've to convert it to string and then to json
// app.use(express.raw());
// app.use(express.text());
// app.use(express.urlencoded());
app.use(
  express.static(__dirname + "/public", {
    extensions: ["html"],
    index: "home.html",
  })
);
const router = app.use(
  express.Router({
    caseSensitive: true,
  })
);

app.use("/admin", admin);

admin.get("/dashboard", handler);

// router.all("/", routerAll);

router.get("/home", routerGet);

router.post("/dashboard", routerPost);

app.param("id", (req, res, next, id) => {
  const user = {
    userId: id,
    name: "SharMinhaj",
  };
  req.userInfo = user;
  next();
});

router.get("/user/:id", (req, res) => {
  res.send(req.userInfo);
  console.log("id", req.params.id);
});

router.get("/about/mission/:id", (req, res) => {
  console.log("query:", req.query);
});

//route bundler
router
  .route("/about/mission")
  .get((req, res) => {
    console.log("headerSent:", res.headersSent);
    console.log(req.cookies);
    console.log(req.body);
    res.render("pages/about", {
      title: "About",
    });
    console.log("headerSent:", res.headersSent);
    // res.send("about page");
    // res.json({ message: "about page" });
    // res.end();
    //status: isn't close the response you've to use res.end for ending the response
    // res.status(200);
    // res.sendStatus(200); // Quite the opposite from status

    // res.format({
    //   "text/plain": () => {
    //     res.send("hey from plain text");
    //   },
    //   "text/html": () => {
    //     res.render("pages/about", {
    //       title: "Bangladeshi",
    //     });
    //   },
    //   "application/json": () => {
    //     res.json({ message: "hey from json" });
    //   },
    //   default: () => {
    //     res.status(406).send("Not Acceptable");
    //   },
    // });
    // res.cookie("names", "SharMinhaj");
    // res.redirect("/home");
    // res.location("/home");
    // res.set("names", "SharMinhaj");
    // res.get("names");
    // res.end();
  })
  .post((req, res) => {
    res.send("About Mission Post");
  })
  .put((req, res) => {
    res.send("About Mission Put");
  });

const errorMiddleware = (err, req, res, next) => {
  console.log("errorMiddleware");
  next(err.message);
};
app.get("/", (req, res, next) => {
  for (let i = 0; i <= 10; i++) {
    if (i === 5) {
      // throw new Error("error");
      next("there was an error");
    } else {
      res.write("SharMinhaj");
    }
  }
  res.end();
});

app.use((req, res, next) => {
  // res.status(404).send("Page not found");
  next("requested url was not found");
});

app.use((err, req, res, next) => {
  if (res.headersSent) {
    next("there was an error");
  } else {
    if (err.message) {
      res.status(500).send(err.message);
    } else {
      res.status(500).send(err.message);
    }
  }
});

adminRouter.use(errorMiddleware);

//listener: app listen from this line
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
