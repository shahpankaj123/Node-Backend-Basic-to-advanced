import express from "express";
import { is_none, message } from "../mainapps/common_function.js";
import { Gender, UserType } from "../accounts/model.js";
import { AdminUser } from "../mainapps/mixins.js";

const admin_router = express.Router();

admin_router.post("/create-gender", AdminUser, async (req, res, next) => {
  const { name } = req.body;
  if (is_none(name)) {
    const error = new Error("Data Not Found");
    error.status = 404;
    return next(error);
  }
  if (await Gender.findOne({ name })) {
    const error = new Error("Gender Already Exists");
    error.status = 400;
    return next(error);
  }
  const gender_obj = await Gender.create({
    name: name,
  });
  if (!gender_obj) {
    const error = new Error("Something Went Wrong");
    error.status = 400;
    return next(error);
  }
  res.status(201).json(message("Gender Created Successfully"));
});

admin_router.post("/create-user-type", AdminUser, async (req, res, next) => {
  const { name } = req.body;
  if (is_none(name)) {
    const error = new Error("Data Not Found");
    error.status = 404;
    return next(error);
  }
  if (await UserType.findOne({ name })) {
    const error = new Error("UserType Already Exists");
    error.status = 400;
    return next(error);
  }
  const user_type_obj = await UserType.create({
    name: name,
  });
  if (!user_type_obj) {
    const error = new Error("Something Went Wrong");
    error.status = 400;
    return next(error);
  }
  res.status(201).json(message("UserType Created Successfully"));
});

export default admin_router;
