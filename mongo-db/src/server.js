import express from "express";
import connect_db from "./config/db.js";
import userroute from "./user/route.js";
import message from "./user/module/common_function.js";

const app = express();
connect_db();

// Global Middleware
app.use(express.json());

app.use("/web/api/v1", userroute);

const error = (err, req, res, next) => {
  res.statusCode(400).json(message("Something Went Wrong !"));
};

app.listen(process.env.PORT, () => {
  console.log("Server is Running ....");
});
