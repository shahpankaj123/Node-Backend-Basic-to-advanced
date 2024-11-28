import express from "express";
import LoginModule from "./module/login_mdoule.js";

const userroute = express.Router();

userroute.post("/signup", async (req, res, next) => {
  try {
    const data = req.body;
    const lm = new LoginModule(data);
    const { res_data, st } = await lm.Create_user();
    res.status(st).json(res_data);
  } catch (err) {
    next(err);
  }
});

export default userroute;
