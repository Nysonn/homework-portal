import React from "react";
import { Link } from "react-router-dom";

const classes = [
  "Primary One",
  "Primary Two",
  "Primary Three",
  "Primary Four",
  "Primary Five",
  "Primary Six",
  "Primary Seven",
];

function ClassDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 to-blue-200 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Primary School Classes
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {classes.map((className, index) => (
            <Link
              key={index}
              to={`/class/${className.toLowerCase().replace(/\s+/g, "-")}`}
              className="block group"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-white">
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl rotate-45 transform transition-transform group-hover:rotate-0 duration-300 flex items-center justify-center shadow-lg">
                    <span className="text-white text-3xl font-bold -rotate-45 group-hover:rotate-0 transition-transform duration-300">
                      {className.split(" ")[1]}
                    </span>
                  </div>
                </div>
                <h2 className="text-2xl text-center text-gray-700 font-semibold mb-4">
                  {className}
                </h2>
                <div className="w-1/3 h-1 mx-auto bg-gradient-to-r from-pink-400 to-blue-400 rounded-full opacity-50 group-hover:w-2/3 transition-all duration-300"></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ClassDashboard;
