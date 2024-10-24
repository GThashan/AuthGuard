import express from 'express';
import { ConnDB } from './db/connDB.js';
import dotenv from 'dotenv'

dotenv.config();

const app =express();
app.listen(3000,()=>{
    ConnDB();
    console.log("app is runing in port 3000"); 
})
