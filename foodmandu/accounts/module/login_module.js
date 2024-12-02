import { is_none, message } from "../../mainapps/common_function.js";
import { Gender, User, UserType } from "../model.js";
import passwordHash from "password-hash";
import jwt from "jsonwebtoken";

class LoginModule {
  constructor(data) {
    this.data = data;
  }

  async create_user() {
    const { userName, fullName, email, password, genderId } = this.data;
    if (
      is_none(userName) ||
      is_none(fullName) ||
      is_none(email) ||
      is_none(password) ||
      is_none(genderId)
    ) {
      return { res_data: message("Please Provide All Information"), st: 404 };
    }
    if (
      await User.findOne({
        $or: [{ username: userName }, { email }],
      })
    ) {
      return { res_data: message("Username or Email Already Exists"), st: 400 };
    }
    const hashedPassword = passwordHash.generate(password);
    const usrtype = await UserType.findOne({ name: "normal" });
    const genderType = await Gender.findById(genderId);

    const createdUser = await User.create({
      username: userName,
      email,
      full_name: fullName,
      userType: usrtype,
      gender: genderType,
      password: hashedPassword,
    });

    if (!createdUser) {
      return { res_data: message("Something Went Wrong"), st: 400 };
    }

    return { res_data: message("User Created Successfully"), st: 201 };
  }

  async login_user() {
    const { email, password } = this.data;
    if (is_none(email) || is_none(password)) {
      return { res_data: message("Email or Password Not Found"), st: 404 };
    }
    const usr = await User.findOne({ email: email });
    if (!usr) {
      return { res_data: message("User Not Found"), st: 404 };
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
}

export default LoginModule;
