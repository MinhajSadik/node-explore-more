const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const checkLogin = require("../middlewares/checkLogin");
const Todo = require("../schemas/todoSchema");

//Get Active todos with async
router.get("/active", async (req, res) => {
  const todo = new Todo();
  const data = await todo.findActive();
  res.status(200).json({
    data,
  });
});

//Get Active todos with callback
router.get("/active-callback", (req, res) => {
  const todo = new Todo();
  todo.findActiveCallback((err, data) => {
    if (err) {
      res.status(500).json({
        error: err,
      });
    } else {
      res.status(200).json({
        data,
      });
    }
  });
});

//Get Active todos with callback
router.get("/js", async (req, res) => {
  const data = await Todo.findByJs();
  res.status(200).json({
    data,
  });
});

//Get todos by language
router.get("/language", async (req, res) => {
  const data = await Todo.find().byLanguage("js");
  res.status(200).json({
    data,
  });
});

//get all todos
router.get("/", checkLogin, (req, res) => {
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
  Todo.find({})
    .populate("user", "name username -_id")
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
  try {
    const data = await Todo.find({ _id: req.params.id });
    res.status(200).json({
      data,
      message: "Successfully fetched todo",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});
// Todo.find({ _id: req.params.id })
//   .select({
//     _id: 0,
//     __v: 0,
//     date: 0,
//   })
//   .exec((err, todo) => {
//     if (err) {
//       res.status(500).json({
//         error: err.message,
//       });
//     } else {
//       res.status(200).json({
//         todo,
//         message: "Successfully found todo by ID",
//       });
//     }
//   });

//post a todos
router.post("/", checkLogin, async (req, res) => {
  const newTodo = new Todo({
    ...req.body,
    user: req.user.userID,
  });

  try {
    await newTodo.save();
    res.status(200).json({
      message: "Todo was inserted successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

//post all todos
router.post("/all", (req, res) => {
  Todo.insertMany(req.body, (err) => {
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
router.delete("/:id", (req, res) => {
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
