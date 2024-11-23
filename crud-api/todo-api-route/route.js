const express = require("express");
const db = require("../db/connection");
const { json } = require("stream/consumers");
const router = express.Router();

function info(message) {
  return { message: message };
}

router.get("/get-todo", (req, res) => {
  db.query("SELECT id,title,description FROM todos", (err, data) => {
    if (err) {
      console.error("Error fetching todos:", err.message);
      res.status(500).json({ message: "Database error" });
    } else {
      if (data.length > 0) res.status(200).json(data);
      else res.status(404).json({ message: "No data Found" });
    }
  });
});

router.get("/get", (req, res) => {
  const { id } = req.query;
  if (!id) {
    res.status(404).json({ message: "id Not found" });
  }
  const query = "SELECT id,title,description FROM todos WHERE id =(?)";
  db.query(query, [id], (err, data) => {
    if (err) {
      res.status(400).json({ message: "Something Went Wrong" });
    }
    res.status(200).json(data);
  });
});

router.post("/update-todo", (req, res) => {
  const { id, title, desc } = req.body;
  if (!id || !title || !desc) {
    res.status(404).json(info("Data Not Found"));
  }
  const query = "UPDATE todos SET title = ?, description = ? WHERE id = ?";
  db.query(query, [title, desc, id], (err, data) => {
    if (err) {
      res.status(400), json(info("Something went Wrong"));
    }
    res.status(200).json(info("Todo Updated Successfully"));
  });
});

router.post("/del-todo", (req, res) => {
  const { id } = req.body;
  if (!id) {
    res.status(404).json(info("id Not Found"));
  }
  const query = "DELETE FROM todos WHERE id=?";
  db.query(query, [id], (err, data) => {
    if (err) {
      res.status(400), json(info("Something went Wrong"));
    }
    res.status(200).json(info("Todo Deleted Successfully"));
  });
});

router.post("/create-todo", (req, res) => {
  const { title, desc } = req.body;
  if (!title || !desc) {
    return res.status(400).json({
      error: "Title and description are required",
    });
  }

  console.log("Title:", title, "Description:", desc);

  const query = "INSERT INTO todos (title, description) VALUES (?, ?)";
  db.query(query, [title, desc], (err, result) => {
    if (err) {
      console.error("Error creating todo:", err.message);
      return res.status(500).json({ error: "Database error" });
    }
    res.status(201).json({ message: "Todo created successfully" });
  });
});

module.exports = router;
