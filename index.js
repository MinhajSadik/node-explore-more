const express = require("express");
const mongooose = require("mongoose");

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

//database connetion with mongoose
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongooose
  .connect("mongodb://127.0.0.1:27017/todos", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to Database..."))
  .catch((err) => console.error("Couldn't connect to Ddatabase...", err));

//application routes
app.get("/", (req, res) => {
  res.send("Learning MongoDB Commands");
});

//default error handler
const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ error: err.message });
};

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
