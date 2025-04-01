import React from "react";
import { downloadHomework, deleteHomework } from "../../api/homeworkAPI";

const HomeworkItem = ({ hw, userRole, setHomework }) => {
  // Handler for downloading homework files
  const handleDownload = async () => {
    try {
      await downloadHomework(hw.fileUrl, `${hw.title}.pdf`);
    } catch (err) {
      console.error("Download error:", err);
      alert("Failed to download file. Please try again.");
    }
  };

  // Handler for deleting homework (only available to teachers)
  const handleDelete = async () => {
    try {
      await deleteHomework(hw.id);
      setHomework((prevHomework) =>
        prevHomework.filter((item) => item.id !== hw.id)
      );
    } catch (err) {
      console.error("Error deleting homework:", err);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 transform transition-all duration-300 hover:scale-102 hover:shadow-xl hover:bg-white">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h2 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-blue-600">
            {hw.title}
          </h2>
          <p className="text-gray-600 mt-2">{hw.description}</p>
          <p className="text-sm text-gray-500 mt-2">
            Uploaded on: {new Date(hw.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={handleDownload}
            className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-blue-500 text-white font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            Download
          </button>
          {userRole === "teacher" && (
            <button
              onClick={handleDelete}
              className="inline-flex items-center px-4 py-2 rounded-full bg-red-500 text-white font-semibold hover:bg-red-600 hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeworkItem;
