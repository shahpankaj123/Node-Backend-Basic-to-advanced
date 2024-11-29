import jwt from "jsonwebtoken";

const UserMixins = (req, res, next) => {
  let token;
  if (req.headers.authorization?.startsWith("token")) {
    token = req.headers.authorization.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.userId = decoded.id;
      next();
      return;
    } catch (err) {
      next(err);
      return;
    }
  }
  const error = new Error("You Donot Have Access !");
  next(error);
  return;
};

export default UserMixins;
