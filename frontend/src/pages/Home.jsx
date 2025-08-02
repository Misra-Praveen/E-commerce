import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate()
  return (
    <div className="p-4">
      <div className="flex justify-center align-middle items-center h-12 bg-gray-100">
        <h2 className="w-[80%] text-center px-2 py-1 text-xl font-bold text-purple-500 underline">Home</h2>
        <button className='right-2 rounded-xl px-2 py-1 text-center text-xl font-semibold text-white bg-blue-500 shadow-md shadow-white hover:cursor-pointer hover:bg-blue-700' onClick={()=> navigate("dashboard")}>Dashboard</button>
      </div>
    </div>
  );
};

export default Home;
