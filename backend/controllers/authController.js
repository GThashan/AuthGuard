import { User } from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { genarateTokensetcookie } from '../utils/genarateTokensetcookie.js';


export const SignUp = async (req, res) => {
  const { email, name, password } = req.body;

  
  if (!email || !name || !password) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  const exitUser = await User.findOne({ email });
  if (exitUser) {
    return res.status(400).json({ success: false, message: "User already exists" });
  }

 
  const hashPassword = await bcryptjs.hash(password, 10);

  
  const verificationtoken = Math.floor(100000 + Math.random() * 900000).toString(); 


  const user = new User({
    email,
    password: hashPassword,
    name,
    verificationtoken,
    verificationtokenExpireAt: Date.now() + 24 * 60 * 60 * 1000 
  });

  await user.save();

  
  genarateTokensetcookie(req, res, user._id);

  
  res.status(201).json({ 
    success: true, 
    message: "User registered successfully" },
    user,
    genarateTokensetcookie

);
};
