import React from 'react'

function Dashboard() {
  return (
    <div className='bg-[#110702] max-w-lg p-5 rounded-lg'>
         <h1 className='text-[#FFC300] font-bold text-center text-[20px]'>Dashboard</h1>
         <div className='text-white bg-[#1f1713] p-4 my-4 border border-white rounded-lg'>
          <h1 className='text-[#FFC300] font-bold'>Profile Infromation</h1>
          <div className='p-4'>
            <ul>
              <li>Name : Gamage Hashan</li>
              <li>Email :email@gmail.com</li>
            </ul>
          </div>
         </div>

         <div className='text-white bg-[#1f1713] p-4 my-4 border border-white rounded-lg'>
          <h1 className='text-[#FFC300] font-bold'>Acitivity Information</h1>
          <div className='p-4'>
            <ul>
              <li>Join date : 2024/06/24</li>
              <li>Last Login : 1 min ago , 2024/05/02</li>
            </ul>
          </div>
         </div>

         <div>
          <button className='bg-red-600 text-white px-2 py-2'>LogOut</button>
         </div>
    </div>
  )
}

export default Dashboard
