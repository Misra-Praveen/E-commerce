import React, { useState } from "react";
import api from "../services/api.js";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please Fill All Fields...");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      alert("Please enter a valid email");
      return;
    }
    setLoading(true);

    try {
      const res = await api.post("/users/login", { email, password });
      console.log(res.data);
      const { token, user } = res.data;
      localStorage.setItem("token", token)
      localStorage.setItem("user", user)
      alert(`Welcome, ${user}`);

      navigate("/");
    } catch (error) {
      console.log(error);
      alert(`Login Failed ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="min-h-1/2 max-w-md flex flex-col p-4 mt-5 mx-5 md:mx-auto gap-2 shadow-md bg-gray-50"
    >
      <h2 className="text-center font-semibold text-2xl p-1 mb-2 underline underline-offset-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white ">
        Login Form
      </h2>
      <label className="text-lg text-blue-600 font-semibold">Email</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email..."
        className="outline mb-2 p-1.5 rounded-lg focus:ring-2 ring-blue-200"
      />

      <label className="text-lg text-blue-600 font-semibold">Password</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password..."
        className="outline mb-2 p-1.5 rounded-lg focus:ring-2 ring-blue-300"
      />

      <button
        type="submit"
        disabled={loading}
        className={`text-xl px-2 py-1 rounded-full font-semibold text-white ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-blue-500 to-purple-600"
        } transition `}
      >
        {loading ? "Submitting..." : "Submit"}
      </button>

      <p className="text-center text-sm text-gray-600 mt-4">
        Don’t have an account?{" "}
        <span
          onClick={() => navigate("/register")}
          className="text-blue-600 hover:underline cursor-pointer "
        >
          Sign Up
        </span>
      </p>
    </form>
  );
};

export default Login;
