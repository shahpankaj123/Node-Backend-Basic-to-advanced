import { user } from "../models.js";
import message from "./common_function.js";
import passwordHash from "password-hash";
import jwt from "jsonwebtoken";

class LoginModule {
  constructor(data) {
    this.data = data;
  }

  async login() {
    const { email, password } = this.data;

    if (!email || !password) {
      return { res_data: message("Please Enter All Values"), st: 404 };
    }
    const usr = await user.findOne({ email: email });
    if (!usr) {
      return { res_data: message("User Not Found"), st: 400 };
    }

    if (!passwordHash.verify(password, usr.password)) {
      return { res_data: message("Email or Password Not Matched"), st: 400 };
    }
    var token = jwt.sign({ id: usr._id }, process.env.SECRET_KEY, {
      expiresIn: "10h",
    });
    return {
      res_data: { message: "Login Sucessfully", token: token, id: usr._id },
      st: 200,
    };
  }

  async Create_user() {
    const { username, email, password } = this.data;

    if (!username || !email || !password) {
      return { res_data: message("Please Enter All Values"), st: 404 };
    }

    const existingUser = await user.findOne({
      $or: [{ username }, { email }],
    });
    if (existingUser) {
      return {
        res_data: message("Email or Username already Exists!"),
        st: 400,
      };
    }

    const hashedPassword = passwordHash.generate(password);

    const createdUser = await user.create({
      username,
      email,
      password: hashedPassword,
    });

    if (!createdUser) {
      return { res_data: message("Something Went Wrong"), st: 400 };
    }

    return { res_data: message("User Created Successfully"), st: 201 };
  }

  async get_user_info(user_id) {
    const { id } = this.data;
    if (id != user_id) {
      return { res_data: message("Invalid User"), st: 400 };
    }
    const usr = await user.findById(id);
    return { res_data: usr, st: 200 };
  }
}

export default LoginModule;
