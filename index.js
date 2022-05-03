const express = require("express");
const multer = require("multer");

const app = express();
const PORT = process.env.PORT || 3000;

// File Upload Folder
const UPLOADS_FOLDER = "./uploads";

// Prepare the final multer upload object
let upload = multer({
  dest: UPLOADS_FOLDER,
});

//single file upload
// app.post("/", upload.single("avater"), (req, res) => {
//   res.send("Hello");
// });

//multiple file upload
// app.post("/", upload.array("avater", 3), (req, res) => {
//   res.send("Hello");
// });

//
app.post(
  "/",
  upload.fields([
    { name: "avater", maxCount: 1 },
    { name: "gallery", maxCount: 3 },
  ]),
  (req, res) => {
    res.send("Hello");
  }
);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
