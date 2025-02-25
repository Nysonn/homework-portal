import React from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";

const subjects = ["Mathematics", "English", "Social Studies", "Science"];

function ClassSubjects() {
  const { className } = useParams();
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 to-blue-200 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12 relative">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-blue-600 capitalize">
            {className.replace(/-/g, " ")} - Subjects
          </span>
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-1/4 h-1 bg-gradient-to-r from-pink-400 to-blue-400 rounded-full"></div>
        </h1>
        {user && (
          <div className="text-center mb-8">
            <div className="inline-flex items-center px-6 py-3 bg-white/90 rounded-full shadow-md">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-blue-500 flex items-center justify-center">
                <span className="text-white font-semibold text-lg">
                  {user.username[0].toUpperCase()}
                </span>
              </div>
              <div className="ml-3">
                <p className="text-gray-700 font-medium">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-blue-600">
                    {user.role}
                  </span>
                  <span className="mx-2">·</span>
                  {user.username}
                </p>
              </div>
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {subjects.map((subject, index) => (
            <Link
              key={index}
              to={`/class/${className}/subject/${subject
                .toLowerCase()
                .replace(/\s+/g, "-")}`}
              className="block group"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-white">
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl rotate-45 transform transition-transform group-hover:rotate-0 duration-300 flex items-center justify-center shadow-lg">
                    <span className="text-white text-2xl font-bold -rotate-45 group-hover:rotate-0 transition-transform duration-300">
                      {subject.charAt(0)}
                    </span>
                  </div>
                </div>
                <h2 className="text-2xl text-center text-gray-700 font-semibold mb-4">
                  {subject}
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

export default ClassSubjects;
