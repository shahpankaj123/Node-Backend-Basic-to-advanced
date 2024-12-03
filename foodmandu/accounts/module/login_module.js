import { is_none, message } from "../../mainapps/common_function.js";
import { Gender, User, UserType } from "../model.js";
import passwordHash from "password-hash";
import jwt from "jsonwebtoken";
import sendEmail from "../../mainapps/mail_send.js";

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

    const createdUser = await User({
      username: userName,
      email,
      full_name: fullName,
      userType: usrtype,
      gender: genderType,
      password: hashedPassword,
    });
    try {
      const url = `localhost:4000/web/api/v1/user/verify-account?userId=${createdUser._id}`;
      await sendEmail(createdUser.email, "Activate Your Account", url);
      createdUser.save();
      return { res_data: message("Please Activate Your Account"), st: 201 };
    } catch (err) {
      console.error("Error creating user:", err);
      return { res_data: message("Something Went Wrong"), st: 500 };
    }
  }

  async verify_user() {
    const { userId } = this.data;
    const usr = await User.findById(userId);
    if (!usr) {
      return { res_data: message("User Not Found"), st: 404 };
    }
    if (usr.isActive) {
      return { res_data: message("Account Already Verified"), st: 200 };
    }
    usr.isActive = true;
    usr.save();
    return { res_data: message("Account Verified Successfully"), st: 200 };
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
    if (!usr.isActive) {
      return { res_data: message("Activate Your Account"), st: 400 };
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

  async get_user_details() {
    const { userId } = this.data;
    const usr = await User.findById(userId)
      .select("username email full_name gender")
      .populate("gender", "name");
    if (!usr) {
      return { res_data: message("User Not Found"), st: 400 };
    }
    return { res_data: usr, st: 200 };
  }
}

export default LoginModule;
