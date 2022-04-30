const express = require("express");

const app = express();
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
const router = app.use(express.Router());

router.get("/", (req, res) => {
  res.send("This is home pages!");
});

router.post("/", (req, res) => {
  console.log(req.body.name);
  res.send("This Is Home Page with Post Request");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
