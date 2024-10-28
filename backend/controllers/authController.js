
import bcryptjs from "bcryptjs";
import crypto from 'crypto'
import { genarateTokensetcookie } from "../utils/genarateTokensetcookie.js";
import { sendSuccessResetpassword, sendWelcomeEmail, sendresetPasswordEmail, sendverificationEmail } from "../mailtrap/emails.js";
import { User } from "../models/user.model.js";


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

export const ResetPassword = async(req,res)=>{
  try {
    const {email} = req.body;
    const user = await User.findOne({email});
    if(!user){
      return res.status(201).json({success:false,message:"Invalid Credential"});
    }
  const resetPaswordtoke = crypto.randomBytes(20).toString('hex');
  const resetPasswordtokenexpire = Date.now() + 1* 60 * 60 * 1000;

  user.resetPaswordtoke= resetPaswordtoke;
  user.resetPasswordtokenexpire = resetPasswordtokenexpire;

  await user.save();
  await sendresetPasswordEmail(user.email,`${process.env.CLIENT_URL}/reset-password/${resetPaswordtoke}`);
  console.log("password reset link share succefully");
  return res.status(200).json({success:true,message:"Reset password link share"});

    
  } catch (error) {
    return res(401).json({success:false,message:"Internal server error"});
    
  }
}

export const PasswordReset = async(req,res)=>{

  try {
    const {token} = req.params;
    const {password} = req.body;

    const user = await User.findOne({
      
     resetPaswordtoke : token,
     resetPasswordtokenexpire: { $gt: Date.now() }

    })
    if(!user){
      return res.status(201).json({success:false,message:"Reset password token is expire"});
    }

    const hashPassword = await bcryptjs.hash(password, 10);
    user.password = hashPassword;
    user.resetPaswordtoke = undefined;
    user.resetPasswordtokenexpire = undefined;
    await user.save();
    await sendSuccessResetpassword(user.email);
    return res.status(200).json({success:true,message:"Password reset succeffly!"});
    
  } catch (error) {
    console.log(error);
    return res.status(40).json({success:false,message:"Internal server error"});
    
  }
    


}



export const Logout = (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({ success: false, message: "Logout Succefully" });
};


export const checkauth = async(req,res)=>{
  try {
    const user = await User.findById(req.userId).select("-password");
    if(!user){
      return res.status(201).json({success:false,message:"user not find"})
    }
    return res.status(201).json({success:true,user})
  } catch (error) {
    return res.status(201).json({success:false, message:"Server error"});
  }
}
