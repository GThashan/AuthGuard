import React from 'react'
import { useauthStore } from '../store/authStore'
import { formatDate } from "../utils/date";

function Dashboard() {

  const {user,logout} = useauthStore();

  const handlelogout = async()=>{
    await logout();
  }
  return (
    <div className='bg-[#110702] max-w-lg p-5 rounded-lg'>
         <h1 className='text-[#FFC300] font-bold text-center text-[20px]'>Dashboard</h1>
         <div className='text-white bg-[#1f1713] p-4 my-4 border border-white rounded-lg'>
          <h1 className='text-[#FFC300] font-bold'>Profile Infromation</h1>
          <div className='p-4'>
            <ul>
              <li>Name : {user.name}</li>
              <li>Email : {user.email}</li>
            </ul>
          </div>
         </div>

         <div className='text-white bg-[#1f1713] p-4 my-4 border border-white rounded-lg'>
          <h1 className='text-[#FFC300] font-bold'>Acitivity Information</h1>
          <div className='p-4'>
          <p className='text-gray-300'>
						<span className='font-bold'>Joined: </span>
						{new Date(user.createdAt).toLocaleDateString("en-US", {
							year: "numeric",
							month: "long",
							day: "numeric",
						})}
					</p>
					<p className='text-gray-300'>
						<span className='font-bold'>Last Login: </span>

						{formatDate(user.lastLogin)}
					</p>
          </div>
         </div>

         <div>
          <button className='bg-red-600 text-white px-2 py-2' onClick={handlelogout}>LogOut</button>
         </div>
    </div>
  )
}

export default Dashboard
