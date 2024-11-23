const express = require("express");
const todorouter = require("./todo-api-route/route");
const app = express();
require("./db/model");
const port = 4000;

app.use(express.json());
app.use("/web/api/v1", todorouter);

app.listen(port, () => {
  console.log("Running.....");
});
