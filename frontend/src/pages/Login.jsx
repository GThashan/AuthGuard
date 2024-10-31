import React, { useState } from "react";
import Inputfeild from "../Components/Inputfeild";
import { Loader, Lock, Mail, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useauthStore } from "../store/authStore";

function Login() {
    
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
   const {login,error,isloading} = useauthStore();
   const Navigate = useNavigate();


    const handlelogin =async (e)=>{
        e.preventDefault();
        try {
          await login(email,password);
          return Navigate('/');
        } catch (error) {
           console.log(error);
        }
       
        
    }
  return (
    
      <div className="bg-[#110702] max-w-xl w-full p-6 rounded-lg shadow-lg">
      <h1 className="text-white text-center text-[23px] mb-4 font-bold">
        Welcome Back
      </h1>

      <form onSubmit={handlelogin}>
      {error ? <div className="bg-red-400 text-white text-center font-bold p-2">{error}</div>  : ""}
        <div className="relative mb-6">
          <label className="absolute -top-3 left-3 px-1  text-[#FFC300] text-md">
            Email
          </label>
          <Inputfeild
            icon={Mail}
            type="email"
            placeholder="Enter the valid email address"
            value={email}
            onChange = {(e)=>setEmail(e.target.value)}
          />
        </div>
        <div className="relative mb-6">
          <label className="absolute -top-3 left-3 px-1  text-[#FFC300] text-md">
            Password
          </label>
          <Inputfeild
            icon={Lock}
            type="text"
            placeholder="Enter the password"
            value={password}
            onChange = {(e)=>setPassword(e.target.value)}
          />
        </div>

        <Link to="/forgot-password" className="text-[#FFC300]">Forgot password</Link>

       
        <div className="flex items-center justify-center text-white my-4 ">
          <button 
          
          disabled={isloading}
          type="submit" className="bg-[#FFC300] px-1 py-2 w-1/2 font-bold shadow-md rounded-lg cursor-pointer hover:scale-105">
          
          {isloading ? <Loader className="animate-spin text-center mx-auto"></Loader> : "Login"} 
          </button>
        </div>
      </form>
      <hr className="text-white mt-5" />
      <div>
        <p className="text-gray-600 text-center my-2">
          Don't have an account ?{" "}
          <Link to="/register" className="text-[#FFC300]">
            Register
          </Link>
        </p>
      </div>
    </div>
      
  
  )
}

export default Login
