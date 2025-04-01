import React from "react";
import BackgroundImage from "../../assets/background.jpg";
import LoginForm from "./LoginForm";

function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 to-blue-200 relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={BackgroundImage}
          alt="Cartoon Background"
          className="w-full h-full object-cover opacity-20"
        />
      </div>
      <LoginForm />
    </div>
  );
}

export default Login;
