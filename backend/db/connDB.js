import mongoose from "mongoose";


export const ConnDB = async()=>{
   try {
    
     const con =await mongoose.connect(process.env.MONGO_URL);
     console.log("Database is connected");
   } catch (error) {
    console.log(error)
    
   }

}