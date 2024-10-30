import { create } from 'zustand'
import axios from 'axios'

export const useauthStore = create((set)=>({
    user : null,
    isAuthenticated : false,
    error :null,
    isloading : false,
    isCheckeckingauth : true,
    

    signUp: async(email,name,password)=>{
        set({isloading:true,error:null})
        try {
            const response = await axios.post(`http://localhost:3000/api/auth/signUp`,{email,password,name});
            set({user: response.data.user , isAuthenticated:true, isloading:false})
        } catch (error) {
            set({error: error.response.data.massage || "Signing faliure" ,  isloading:false})
            throw error
        }
    }

}))