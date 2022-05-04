const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Todo = require("../schemas/todoSchema");

//get all todos
router.get("/", async (req, res) => {
  res.send("Get all todos");
});

//get a todo by ID
router.get("/:id", async (req, res) => {});

//post a todos
router.post("/", async (req, res) => {
  const newTodo = new Todo(req.body);
  await newTodo.save((err) => {
    if (err) {
      res.status(500).json({
        error: err,
      });
    } else {
      res.status(200).json({
        message: "Todo was inserted successfully",
      });
    }
  });
});

//post all todos
router.post("/all", async (req, res) => {});

//put todos
router.put("/:id", async (req, res) => {});

//get all todos
router.delete("/:id", async (req, res) => {});

module.exports = router;
