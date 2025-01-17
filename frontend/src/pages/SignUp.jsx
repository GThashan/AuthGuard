import React, { useState } from "react";
import Inputfeild from "../Components/Inputfeild";
import { Loader, Lock, Mail, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import PasswordStrengthMeter from "../Components/PasswordStrengthMeter";
import { useauthStore } from "../store/authStore";

function SignUp() {

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const {signUp, isloading, error} = useauthStore();
    const navigate = useNavigate();


    const handlesignUp = async(e)=>{
        e.preventDefault();

        try {
          await signUp(name,email,password);
          navigate('/email-verify');
        } catch (error) {
           console.log(error)
        }
    }
  return (
    <div className="bg-[#3A3A3B] max-w-xl w-full p-6 rounded-lg shadow-lg my-8">
      <h1 className="text-white text-center text-[23px] mb-4 font-bold">
        Create Account
      </h1>

      <form onSubmit={handlesignUp}>
      {error ? <div className="bg-red-400 text-white text-center font-bold p-2">{error}</div>  : ""}
       
        <div className="relative my-9">
          <label className="absolute -top-3 left-3 px-1  text-[#FFC300] text-md">
            Full Name
          </label>
          <Inputfeild
            icon={User}
            type="text"
            placeholder="Enter the full name"
            value={name}
            onChange = {(e)=>setName(e.target.value)}
          />
        </div>
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
            placeholder="Enter the Strong password"
            value={password}
            onChange = {(e)=>setPassword(e.target.value)}
          />
        </div>

        <PasswordStrengthMeter password={password}/>
        <div className="flex items-center justify-center text-white my-4 ">
          <button type="submit"
          disabled={isloading}
          className="bg-[#FFC300] px-1 py-2 w-1/2 font-bold shadow-md rounded-lg cursor-pointer hover:scale-105">
          {isloading ? <Loader className="animate-spin text-center mx-auto"></Loader> : "Sign Up"} 
          </button>
        </div>
      </form>
      <hr className="text-white mt-5" />
      <div>
        <p className="text-gray-600 text-center my-2">
          If You have an account ?{" "}
          <Link to="/login" className="text-[#FFC300]">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
