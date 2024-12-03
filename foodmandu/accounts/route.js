import express from "express";
import LoginModule from "./module/login_module.js";
import { NormalUser } from "../mainapps/mixins.js";
const user_router = express.Router();

user_router.post("/signup", async (req, res, next) => {
  try {
    const data = req.body;
    const lm = new LoginModule(data);
    const { res_data, st } = await lm.create_user();
    res.status(st).json(res_data);
  } catch (err) {
    next(err);
  }
});

user_router.get("/verify-account", async (req, res, next) => {
  try {
    const data = req.query;
    const lm = new LoginModule(data);
    const { res_data, st } = await lm.verify_user();
    res.status(st).json(res_data);
  } catch (err) {
    next(err);
  }
});

user_router.post("/login", async (req, res, next) => {
  try {
    const data = req.body;
    const lm = new LoginModule(data);
    const { res_data, st } = await lm.login_user();
    req.userId = res_data.id;
    res.status(st).json(res_data);
  } catch (err) {
    next(err);
  }
});

user_router.get("/get-user", NormalUser, async (req, res, next) => {
  try {
    const data = req.query;
    const lm = new LoginModule(data);
    const { res_data, st } = await lm.get_user_details();
    res.status(st).json(res_data);
  } catch (err) {
    next(err);
  }
});

export default user_router;
