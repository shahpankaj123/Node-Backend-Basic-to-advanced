import express from "express";
import connect_db from "./config/db.js";
import userroute from "./user/route.js";
import message from "./user/module/common_function.js";

const app = express();
connect_db();

// Global Middleware
app.use(express.json());

app.use("/web/api/v1/user", userroute);

app.use((err, req, res, next) => {
  const status_code = err.stausCode || 500;
  res.status(status_code).json(message(err.message));
});

app.listen(process.env.PORT, () => {
  console.log("Server is Running ....");
});
