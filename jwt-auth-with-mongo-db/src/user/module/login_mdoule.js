import { user } from "../models.js";
import message from "./common_function.js";
import passwordHash from "password-hash";

class LoginModule {
  constructor(data) {
    this.data = data;
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
}

export default LoginModule;
