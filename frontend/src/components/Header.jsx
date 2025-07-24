import React from "react";
import Logo from "./Logo";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"


const Header = () => {
  const [userName,setUserName] = useState("")
  const navigate = useNavigate()

  const handleLoginClick = () =>{
    navigate("/login")
  }

  useEffect(()=>{
    try {
      const user = localStorage.getItem("user")
      setUserName(user)
    } catch (error) {
      alert(`Some Error Occure ${error}`)
    }
  },[userName])
  
  return (
    <header className="flex items-center justify-between px-6 py-4 shadow shadow-gray-600">
      <Logo className="m-2" />
      <div className="flex justify-center items-center gap-2">
        <p className="shadow-md px-4 py-2 rounded-md font-semibold bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">{userName}</p>
        <button 
        onClick={handleLoginClick}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
          Login
        </button>
      </div>
    </header>
  );
};

export default Header;
