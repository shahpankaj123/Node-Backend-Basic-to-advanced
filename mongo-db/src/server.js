import express from "express";
import connect_db from "./config/db.js";

const app = express();
connect_db();

// Global Middleware
app.use(express.json());

app.listen(process.env.PORT, () => {
  console.log("Server is Running ....");
});
