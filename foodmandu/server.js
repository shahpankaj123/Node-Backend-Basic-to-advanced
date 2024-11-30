import express from "express";
import { message } from "./mainapps/common_function.js";
import connect_db from "./config/connection_db.js";
import user_router from "./accounts/route.js";
import admin_router from "./admin/route.js";

const app = express();
connect_db();

app.use(express.json());

const port = process.env.PORT || 8000;

// reegister route
app.use("/web/api/v1/user", user_router);
app.use("/web/api/v1/admin", admin_router);

// global Milddleware
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json(message(err.message));
});

app.listen(port, () => {
  console.log(`Server is Running at Port ${port} ...`);
});
