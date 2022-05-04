const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Todo = require("../schemas/todoSchema");

//get all todos
router.get("/", async (req, res) => {
  // Todo.find({}, (err, todos) => {
  //   if (err) {
  //     res.status(500).json({
  //       error: err,
  //     });
  //   } else {
  //     res.status(200).json({
  //       todos,
  //       message: "Successfully fetched all todos",
  //     });
  //   }
  // });
  await Todo.find({})
    .select({
      _id: 0,
      __v: 0,
      date: 0,
    })
    .limit(5)
    .exec((err, todos) => {
      if (err) {
        res.status(500).json({
          error: err.message,
        });
      } else {
        res.status(200).json({
          todos,
          message: "Successfully fetched all todos",
        });
      }
    });
});

//get a todo by ID
router.get("/:id", async (req, res) => {
  // Todo.find({ _id: req.params.id }, (err, todo) => {
  //   if (err) {
  //     res.status(500).json({
  //       error: err,
  //     });
  //   } else {
  //     res.status(200).json({
  //       todo,
  //       message: "Successfully fetched todo",
  //     });
  //   }
  // });
  Todo.find({ _id: req.params.id })
    .select({
      _id: 0,
      __v: 0,
      date: 0,
    })
    .exec((err, todo) => {
      if (err) {
        res.status(500).json({
          error: err.message,
        });
      } else {
        res.status(200).json({
          todo,
          message: "Successfully found todo by ID",
        });
      }
    });
});

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
router.post("/all", async (req, res) => {
  await Todo.insertMany(req.body, (err) => {
    if (err) {
      res.status(500).json({
        error: err,
      });
    } else {
      res.status(200).json({
        message: "Todos were inserted successfully",
      });
    }
  });
});

//put todos
router.put("/:id", (req, res) => {
  // Todo.updateOne(
  //   { _id: req.params.id },
  //   {
  //     $set: {
  //       title: req.body.title,
  //       status: req.body.status,
  //     },
  //   },
  //   (err) => {
  //     if (err) {
  //       res.status(500).json({
  //         error: err.message,
  //       });
  //     } else {
  //       res.status(200).json({
  //         message: "Todo was updated successfully",
  //       });
  //     }
  //   }
  // );
  Todo.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        title: req.body.title,
        status: req.body.status,
      },
    },
    {
      new: true,
    },
    (err) => {
      if (err) {
        res.status(500).json({
          error: err.message,
        });
      } else {
        res.status(200).json({
          message: "Todo was updated successfully",
        });
      }
    }
  );
});

//get all todos
router.delete("/:id", async (req, res) => {
  Todo.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).json({
        error: err,
      });
    } else {
      res.status(200).json({
        message: "todo was deleted successfully",
      });
    }
  });
});

module.exports = router;
