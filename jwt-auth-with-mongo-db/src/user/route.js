import express from "express";
import LoginModule from "./module/login_mdoule.js";
import UserMixins from "../mainapp/mixins.js";

const userroute = express.Router();

userroute.post("/login", async (req, res, next) => {
  try {
    const data = req.body;
    const lm = new LoginModule(data);
    const { res_data, st } = await lm.login();
    res.status(st).json(res_data);
  } catch (err) {
    next(err);
  }
});

userroute.get("", UserMixins, async (req, res, next) => {
  try {
    const data = req.query;
    const lm = new LoginModule(data);
    const { res_data, st } = await lm.get_user_info(req.userId);
    res.status(st).json(res_data);
  } catch (err) {
    next(err);
  }
});

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
