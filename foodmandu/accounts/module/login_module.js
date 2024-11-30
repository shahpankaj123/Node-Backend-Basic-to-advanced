import { is_none, message } from "../../mainapps/common_function.js";
import { Gender, User, UserType } from "../model.js";
import passwordHash from "password-hash";

class LoginModule {
  constructor(data) {
    this.data = data;
  }

  async create_user() {
    const { userName, fullName, email, password, gender } = this.data;
    if (
      is_none(userName) ||
      is_none(fullName) ||
      is_none(email) ||
      is_none(password) ||
      is_none(gender)
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

    const createdUser = await User.create({
      username: userName,
      email,
      full_name: fullName,
      userType: UserType.findOne({ name: "normal" }),
      gender: Gender.findOne({ name: gender }),
      password: hashedPassword,
    });

    if (!createdUser) {
      return { res_data: message("Something Went Wrong"), st: 400 };
    }

    return { res_data: message("User Created Successfully"), st: 201 };
  }
}

export default LoginModule;
