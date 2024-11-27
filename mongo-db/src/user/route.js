import express from "express";
import message from "./module/common_function.js";

const userroute = express.Router();

userroute.get("/user", (req, res) => {
  res.json(message("hello"));
});

export default userroute;
