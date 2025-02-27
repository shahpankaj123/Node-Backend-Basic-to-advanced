import jwt from "jsonwebtoken";
import { User } from "../accounts/model.js";

const AdminUser = (req, res, next) => {
  let token;
  if (req.headers.authorization?.startsWith("token")) {
    token = req.headers.authorization.split(" ")[1];
    var decoded = jwt.verify(token, process.env.SECRET_KEY);
    const usr = User.findById(decoded.id).populate("userType");
    if (usr && usr.userType.name === "admin") {
      return next();
    }
  }
  const error = new Error("Not Authorized");
  error.status = 403;
  next(error);
  return;
};

const NormalUser = async (req, res, next) => {
  let token;
  if (req.headers.authorization?.startsWith("token")) {
    token = req.headers.authorization.split(" ")[1];
    var decoded = jwt.verify(token, process.env.SECRET_KEY);
    const usr = await User.findById(decoded.id).populate("userType");
    if (usr && usr.userType.name === "normal") {
      return next();
    }
  }
  const error = new Error("Not Authorized");
  error.status = 403;
  next(error);
  return;
};

export { AdminUser, NormalUser };
