const express = require("express");
const todorouter = require("./todo-api-route/route");
const app = express();
const port = 4000;

app.use("/web/api/v1", todorouter);

app.listen(port, () => {
  console.log("Running.....");
});
