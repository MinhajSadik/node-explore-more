const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("This is home pages!");
});

app.post("/", (req, res) => {
  console.log(req.body);
  res.send("This Is Home Page with Post Request");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
