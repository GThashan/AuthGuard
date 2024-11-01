import bcryptjs from "bcryptjs";
import crypto from 'crypto';
import { genarateTokensetcookie } from "../utils/genarateTokensetcookie.js";
import { sendSuccessResetpassword, sendWelcomeEmail, sendresetPasswordEmail, sendverificationEmail } from "../mailtrap/emails.js";
import { User } from "../models/user.model.js";


export const SignUp = async (req, res) => {
  const { email, name, password } = req.body;

  if (!email || !name || !password) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ success: false, message: "User already exists" });
  }

  try {
    const hashedPassword = await bcryptjs.hash(password, 10);
    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

    const user = new User({
      email,
      password: hashedPassword,
      name,
      verificationtoken: verificationToken,
      verificationtokenExpireAt: Date.now() + 24 * 60 * 60 * 1000,
    });

    await user.save();
    genarateTokensetcookie(res, user._id);
    await sendverificationEmail(user.email, verificationToken);

    res.status(201).json({
      user: {
        ...user._doc,
        password: undefined,
      },
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Registration failed", error });
  }
};


export const Emailverification = async (req, res) => {
  try {
    const { code } = req.body;
    const existingUser = await User.findOne({
      verificationtoken: code,
      verificationtokenExpireAt: { $gt: Date.now() },
    });
    if (!existingUser) {
      return res.status(400).json({ success: false, message: "Invalid or expired token" });
    }

    existingUser.isverify = true;
    existingUser.verificationtoken = undefined;
    existingUser.verificationtokenExpireAt = undefined;

    await existingUser.save();
    await sendWelcomeEmail(existingUser.email, existingUser.name);

    return res.status(200).json({ success: true, message: "Welcome email sent successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};


export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const comparePassword = await bcryptjs.compare(password, user.password);
    if (!comparePassword) {
      return res.status(401).json({ success: false, message: "Incorrect password" });
    }

    user.lastLogin = new Date();
    await user.save();

    return res.status(200).json({ success: true, message: "Login successful" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};


export const ResetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const resetPasswordToken = crypto.randomBytes(20).toString('hex');
    user.resetPaswordtoke = resetPasswordToken;
    user.resetPasswordtokenexpire = Date.now() + 1 * 60 * 60 * 1000;

    await user.save();
    await sendresetPasswordEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetPasswordToken}`);

    return res.status(200).json({ success: true, message: "Password reset link sent" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};


export const PasswordReset = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordTokenExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ success: false, message: "Reset password token has expired" });
    }

    user.password = await bcryptjs.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpire = undefined;

    await user.save();
    await sendSuccessResetpassword(user.email);

    return res.status(200).json({ success: true, message: "Password reset successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};


export const Logout = (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({ success: true, message: "Logged out successfully" });
};


export const checkauth = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log("Error in checkAuth ", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
