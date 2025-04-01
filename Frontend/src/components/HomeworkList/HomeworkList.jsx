import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useHomework from "../../hooks/useHomework";
import HomeworkUploadForm from "./HomeworkUploadForm";
import HomeworkItem from "./HomeworkItem";

function HomeworkList() {
  const { className, subjectName } = useParams();
  const { homework, setHomework, loading, error } = useHomework(className, subjectName);

  // Get user info from Redux state and normalize role to lowercase.
  const user = useSelector((state) => state.auth.user);
  const userRole = user?.role ? user.role.toLowerCase() : "parent";

  if (loading)
    return <div className="text-center mt-10">Loading homework...</div>;
  if (error)
    return <div className="text-center mt-10 text-red-500">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 to-blue-200 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12 relative">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-blue-600 capitalize">
            {subjectName.replace(/-/g, " ")} - {className.replace(/-/g, " ")}
          </span>
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-1/4 h-1 bg-gradient-to-r from-pink-400 to-blue-400 rounded-full"></div>
        </h1>

        {/* Only teachers can see the upload form */}
        {userRole === "teacher" && (
          <HomeworkUploadForm
            className={className}
            subjectName={subjectName}
            setHomework={setHomework}
          />
        )}

        {/* Homework List */}
        <div className="max-w-4xl mx-auto">
          {homework.length === 0 ? (
            <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8">
              <p className="text-gray-700 text-lg">No homework uploaded yet.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {homework.map((hw) => (
                <HomeworkItem
                  key={hw.id}
                  hw={hw}
                  userRole={userRole}
                  setHomework={setHomework}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomeworkList;
