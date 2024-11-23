const express = require("express");

const router = express.Router();

router.get("/get-todo", (req, res) => {
  const todo = {
    name: "Learning Node.js",
    date: "2024-11-26",
  };
  res.json(todo);
});

module.exports = router;
