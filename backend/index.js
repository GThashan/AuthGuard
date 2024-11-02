import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";


import { ConnDB } from "./db/connDB.js";
import authRoute from "./routes/authroute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors({
	origin:["https://auth-guard-sigma.vercel.app/"],
	methods:["POST","GET"],
	credentials:true
}));

app.use(express.json()); 
app.use(cookieParser()); 
app.get("/",(req,res)=>{
	res.json("Hello");
})
app.use("/api/auth", authRoute);


app.listen(PORT, () => {
	ConnDB();
	console.log("Server is running on port: ", PORT);
});