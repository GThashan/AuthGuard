import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { genarateTokensetcookie } from "../utils/genarateTokensetcookie.js";
import { sendWelcomeEmail, sendverificationEmail } from "../mailtrap/emails.js";
import MessagesApi from "mailtrap/dist/lib/api/resources/Messages.js";

export const SignUp = async (req, res) => {
  const { email, name, password } = req.body;

  if (!email || !name || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  const exitUser = await User.findOne({ email });
  if (exitUser) {
    return res
      .status(400)
      .json({ success: false, message: "User already exists" });
  }

  const hashPassword = await bcryptjs.hash(password, 10);

  const verificationtoken = Math.floor(
    100000 + Math.random() * 900000
  ).toString();

  const user = new User({
    email,
    password: hashPassword,
    name,
    verificationtoken,
    verificationtokenExpireAt: Date.now() + 24 * 60 * 60 * 1000,
  });

  await user.save();

  genarateTokensetcookie(req, res, user._id);
  sendverificationEmail(user.email, verificationtoken);

  res.status(201).json({
    user: {
      ...user._doc,
      password: null,
    },
    success: true,
    message: "User registered successfully",
  });
};

export const Emailverification = async (req, res) => {
  try {
    const { code } = req.body;
    const exituser = await User.findOne({
      verificationtoken: code,
      verificationtokenExpireAt: { $gt: Date.now() },
    });
    if (!exituser) {
      return res
        .status(200)
        .json({ success: false, message: "Invalid or exipire the token" });
    }

    exituser.isverify = true;
    exituser.verificationtoken = undefined;
    exituser.verificationtokenExpireAt = undefined;

    await exituser.save();
    await sendWelcomeEmail(exituser.email, exituser.name);

    return res
      .status(200)
      .json({ success: true, Messages: "Welcome Email send Succefully" });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, Messages: "Internal server error" });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ success: false, message: "User not exit" });
    }

    const comparePassword = await bcryptjs.compare(password, user.password);
    if (!comparePassword) {
      return res
        .status(401)
        .json({ success: false, message: "Password is not matching" });
    }
    user.lastLogin = new Date();
    await user.save();

    return res.status(200).json({ success: true, message: "Login Succfully" });
  } catch (error) {
    console.log(error)
    return res
      .status(401)
      .json({ success: false, message: "Internal server error" });
  }
  
};

export const Logout = (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({ success: false, message: "Logout Succefully" });
};
