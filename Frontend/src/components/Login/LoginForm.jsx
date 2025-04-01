import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../slices/authSlice";
import LogoImage from "../../assets/duck-logo.png";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Ensure cookies are sent and received
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      setSuccess("Login successful!");
      dispatch(
        loginSuccess({
          token: data.token,
          user: data.user,
        })
      );
      localStorage.setItem("token", data.token);

      setTimeout(() => {
        navigate("/classdashboard");
      }, 1000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="relative p-6 sm:p-8 bg-white rounded-2xl shadow-xl max-w-md w-full mx-4">
      <div className="flex justify-center mb-4">
        <img src={LogoImage} alt="Cartoon Icon" className="w-16 h-16" />
      </div>
      <h2 className="text-3xl text-gray-800 font-bold text-center mb-6">
        Homework Portal
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 placeholder-gray-500"
            placeholder="Username"
          />
        </div>

        <div>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 placeholder-gray-500"
            placeholder="Password"
          />
        </div>

        <button
          type="submit"
          className="w-full p-3 bg-pink-500 text-white font-semibold rounded-lg shadow hover:bg-pink-600 transition duration-300"
        >
          Sign In
        </button>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-500 text-sm">{success}</p>}

        <div className="flex justify-between text-sm text-gray-600">
          <Link to="/forgot-password" className="hover:text-pink-600 transition">
            Forgot Password?
          </Link>
          <Link to="/signup" className="hover:text-pink-600 transition">
            Create Account
          </Link>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
