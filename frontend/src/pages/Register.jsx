import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

const Register = () => {

  const [form, setForm] = useState({
    name:"", 
    email: "", 
    password: "", 
    confirmPassword: "",
  })
  const [loading, setLoading] =useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (e)=> {
    e.preventDefault();

    if(form.password !== form.confirmPassword){
      alert('Passwords do not match!');
      return;
    }

    if(!form.email.includes("@") || !form.email.endsWith(".com")){
      alert("Please enter a valid email id");
      return;
    }

    setLoading(true)
    try {
      const res = await api.post("/users/register", {
        name: form.name,
        email: form.email,
        password: form.password
      })

      alert("User registered. Go to login.")
      navigate("/login")
    } catch (error) {
      console.log(error)
      alert('Some Error Occure ' + error.message)
    } finally{
      setLoading(false)
    }


  }
  return (
    <div className='min-h-screen flex justify-center bg-gray-100 px-4 py-2'>
      <form 
      onSubmit={handleSubmit}
      className='h-1/2 bg-white p-4 rounded shadow-md w-full max-w-md'
      >
        <fieldset className='border-t-2 border-green-400 p-2 text-center'>
          <legend className='text-green-500 p-1 font-bold'>Welcome to  create a new account</legend>

          <label className="block mb-1 mt-2 text-start text-blue-500 font-semibold">
            Username<span className="text-red-500 font-bold">*</span>
          </label>
          <input 
            type='text'
            placeholder='Enter a fullname...'
            onChange={(e)=> setForm({...form, name: e.target.value})}
            value={form.name}
            className='w-full shadow-sm px-3 py-2 rounded focus: outline-none focus:ring-2 focus:ring-blue-200'
            required

          />

          <label className="block mb-1 mt-2 text-start text-blue-500 font-semibold">
            Email<span className="text-red-500 font-bold">*</span>
          </label>
          <input 
            type='email'
            placeholder='Enter an email...'
            onChange={(e)=> setForm({...form, email: e.target.value})}
            value={form.email}
            className='w-full shadow-sm px-3 py-2 rounded focus: outline-none focus:ring-2 focus:ring-blue-200'
            required

          />

          <label className="block mb-1 mt-2 text-start text-blue-500 font-semibold">
            Password<span className="text-red-500 font-bold">*</span>
          </label>
          <input 
            type='password'
            placeholder='Enter a password...'
            onChange={(e)=> setForm({...form, password: e.target.value})}
            value={form.password}
            className='w-full shadow-sm px-3 py-2 rounded focus: outline-none focus:ring-2 focus:ring-blue-200'
            required

          />

          <label className="block mb-1 mt-2 text-start text-blue-500 font-semibold">
            Confirm Password<span className="text-red-500 font-bold">*</span>
          </label>
          <input 
            type='password'
            placeholder='Enter a confirm password...'
            onChange={(e)=> setForm({...form, confirmPassword: e.target.value})}
            value={form.confirmPassword}
            className='w-full shadow-sm px-3 py-2 rounded focus: outline-none focus:ring-2 focus:ring-blue-200'
            required

          />

          <button
            type='submit'
            disabled={loading}
            className={`w-full mt-3 shadow-2xl text-white py-2 rounded ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            } transition`}
          >{loading ? "Submitting" :"Register"}</button>

        </fieldset>
      </form>
    </div>
  )
}

export default Register