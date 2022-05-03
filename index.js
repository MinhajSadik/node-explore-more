const express = require("express");
const multer = require("multer");

const app = express();
const PORT = process.env.PORT || 3000;

// File Upload Folder
const UPLOADS_FOLDER = "./uploads";

// Prepare the final multer upload object
var upload = multer({
  // storage: storage,
  dest: UPLOADS_FOLDER,
  limits: {
    fileSize: 1000000, // 1MB
  },
  fileFilter: (req, file, cb) => {
    if (file.fieldname === "avater") {
      if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg"
      ) {
        cb(null, true);
      } else {
        cb(new Error("Only .jpg, .png or .jpeg format allowed!"));
      }
    } else if (file.fieldname === "doc") {
      if (file.mimetype === "application/pdf") {
        cb(null, true);
      } else {
        cb(new Error("Only .pdf format allowed!"));
      }
    } else {
      cb(new Error("There was an unknown error!"));
    }
  },
});

//single file upload
// app.post("/", upload.single("avater"), (req, res) => {
//   res.send("Hello");
// });

//multiple file upload
// app.post("/", upload.array("avater", 3), (req, res) => {
//   res.send("Hello");
// });

//multiple files upload options
app.post(
  "/",
  upload.fields([
    { name: "avater", maxCount: 1 },
    { name: "doc", maxCount: 1 },
  ]),
  (req, res) => {
    res.send("Hello");
  }
);

app.use((err, req, res, next) => {
  if (err) {
    if (err instanceof multer.MulterError) {
      res.status(500).send(err.message);
    } else {
      res.status(500).send(err.message);
    }
  } else {
    res.send("Success");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
