import express from 'express';
import { ConnDB } from './db/connDB.js';
import dotenv from 'dotenv'
import authrouter from './routes/authroute.js'
import cookieParser from 'cookie-parser';


dotenv.config();

const app =express();
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth',authrouter)
app.listen(3000,()=>{
    ConnDB();
    console.log("app is runing in port 3000");
})
