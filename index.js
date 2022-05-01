const express = require("express");
const { handler, routerPost, routerGet, routerAll } = require("./helpers");

// Create an express app
const app = express();
//sub-app
const admin = express();
app.locals.title = "My App";
const PORT = process.env.PORT || 3000;

app.use(express.json());
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
//sub-app route
admin.get("/dashboard", handler);

//using router
router.all("/", routerAll);

router.get("/", routerGet);

router.post("/", routerPost);

//listener: app listen from this line
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
