import jwt from "jsonwebtoken";

export const genarateTokensetcookie = (req,res,userId) => {
  const token = jwt.sign({ userId }, "YOUR_SECRET_KEY", { expiresIn: "24h" });
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
  return token;
};
