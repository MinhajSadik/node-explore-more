const express = require("express");
const { handler, routerPost, routerGet, routerAll } = require("./helpers");
const cookieParser = require("cookie-parser");

// Create an express app
const app = express();
//sub-app
const admin = express();
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

admin.get("/dashboard/:id", handler);

router.all("/", routerAll);

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
    console.log(req.cookies);
    console.log(req.body);
    res.render("pages/about");
  })
  .post((req, res) => {
    res.send("About Mission Post");
  })
  .put((req, res) => {
    res.send("About Mission Put");
  });

//listener: app listen from this line
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
