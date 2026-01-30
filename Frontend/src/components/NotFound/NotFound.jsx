import React from "react";
import { Link } from "react-router-dom";
import BackgroundImage from "../../assets/background.jpg";
import LogoImage from "../../assets/duck-logo.png";

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 to-blue-200 relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={BackgroundImage}
          alt="Cartoon Background"
          className="w-full h-full object-cover opacity-20"
        />
      </div>
      
      <div className="relative p-8 sm:p-12 bg-white rounded-2xl shadow-xl max-w-lg w-full mx-4 text-center">
        <div className="flex justify-center mb-6">
          <img src={LogoImage} alt="Duck Logo" className="w-20 h-20" />
        </div>
        
        <div className="mb-6">
          <h1 className="text-8xl font-bold text-pink-500 mb-2">404</h1>
          <h2 className="text-3xl text-gray-800 font-bold mb-3">
            Page Not Found
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            Oops! The page you're looking for seems to have wandered off. 
            Let's get you back on track!
          </p>
        </div>

        <div className="space-y-4">
          <Link
            to="/"
            className="block w-full p-3 bg-pink-500 text-white font-semibold rounded-lg shadow hover:bg-pink-600 transition duration-300"
          >
            Go to Homepage
          </Link>
          
          <Link
            to="/classdashboard"
            className="block w-full p-3 bg-blue-400 text-white font-semibold rounded-lg shadow hover:bg-blue-500 transition duration-300"
          >
            Go to Dashboard
          </Link>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          <p>Need help? Contact your administrator</p>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
