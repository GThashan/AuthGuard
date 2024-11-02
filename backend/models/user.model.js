import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
       
    },
    name:{
        type:String,
        required:true,
        
    },
    password:{
        type:String,
        required:true,
       
    },
    lastLogin:{
        type:Date,
        default:Date.now
    },
    isVerified: {
        type: Boolean,
        default: false,
    },

    resetPaswordtoke : String,
    resetPasswordtokenexpire :Date,
    verificationtoken : String,
    verificationtokenExpireAt : Date

},{timestamps:true})

export const User = mongoose.model('User',UserSchema)