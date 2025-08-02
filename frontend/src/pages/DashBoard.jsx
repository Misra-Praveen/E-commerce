import React from 'react'
import { useNavigate } from 'react-router-dom'

const DashBoard = () => {
  const navigate = useNavigate()
  return (
    <div className="p-4 flex justify-between bg-gray-200">
      <h2 className='px-2 py-1 text-xl shadow shadow-white text-indigo-600 font-bold rounded-2xl'>Dashboard</h2>
      <button onClick={()=> navigate("/createProduct")} className='rounded-xl px-2 py-1 text-center text-xl font-semibold text-white bg-blue-500 shadow-md shadow-white hover:cursor-pointer hover:bg-blue-700'>Create Product</button>
    
    </div>
  )
}

export default DashBoard