import jwt from "jsonwebtoken";
import { User } from "../accounts/model.js";

const AdminUser = (req, res, next) => {
  let token;
  if (req.headers.authorization?.startWith("token")) {
    token = req.headers.authorization.split(" ")[1];
    var decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (req.userId != decoded.id) {
      const error = new Error("Not Authorized");
      error.status = 402;
      next(error);
      return;
    }
    const usr = User.findOne({ _id: decoded.id });
    if (usr && usr.userType === "admin") {
      next();
      return;
    }
  }
  const error = new Error("Not Authorized");
  error.status = 403;
  next(error);
  return;
};

const NormalUser = async (req, res, next) => {
  let token;
  if (req.headers.authorization?.startWith("token")) {
    token = req.headers.authorization.split(" ")[1];
    var decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (req.userId != decoded.id) {
      const error = new Error("Not Authorized");
      error.status = 402;
      next(error);
      return;
    }
    const usr = await User.findById(decoded.id);
    if (usr && usr.userType === "normal") {
      next();
      return;
    }
  }
  const error = new Error("Not Authorized");
  error.status = 403;
  next(error);
  return;
};

export { AdminUser, NormalUser };
