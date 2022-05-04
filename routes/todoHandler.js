const express = require("express");
const router = express.Router();

//get all todos
router.get("/", async (req, res) => {
  res.send("Get all todos");
});

//get a todo by ID
router.get("/:id", async (req, res) => {});

//post todos
router.post("/", async (req, res) => {});

//post all todos
router.post("/all", async (req, res) => {});

//put todos
router.put("/:id", async (req, res) => {});

//get all todos
router.delete("/:id", async (req, res) => {});

module.exports = router;
