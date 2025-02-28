import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useHomework from "../../hooks/useHomework";
import useAiRecommendation from "../../hooks/useAiRecommendation"; 
import {
  uploadHomework,
  deleteHomework,
  downloadHomework,
} from "../../api/homeworkAPI";

function HomeworkList() {
  const { className, subjectName } = useParams();
  const { homework, setHomework, loading, error } = useHomework(className, subjectName);

  // Get user info from Redux state and normalize role to lowercase.
  const user = useSelector((state) => state.auth.user);
  const userRole = user?.role ? user.role.toLowerCase() : "parent";

  // Form state for teacher uploads
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  // Use AI recommendation hook whenever title changes
  const { recommendation, loading: aiLoading } = useAiRecommendation(title);

  // Optionally, auto-fill description if teacher hasn’t typed anything yet.
  const handleAutoFill = () => {
    if (!description && recommendation) {
      setDescription(recommendation);
    }
  };

  // Handler for uploading homework (only available to teachers)
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!title || !file) {
      setUploadError("Title and file are required.");
      return;
    }
    setUploading(true);
    setUploadError(null);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("className", className);
      formData.append("subject", subjectName);
      formData.append("file", file);

      const newHomework = await uploadHomework(formData, className, subjectName);
      setHomework((prevHomework) => [...prevHomework, newHomework]);
      setTitle("");
      setDescription("");
      setFile(null);
    } catch (err) {
      setUploadError(err.message);
    } finally {
      setUploading(false);
    }
  };

  // Handler for downloading homework files
  const handleDownload = async (fileUrl, fileName = `${title}.pdf`) => {
    try {
      await downloadHomework(fileUrl, fileName);
    } catch (err) {
      console.error("Download error:", err);
      alert("Failed to download file. Please try again.");
    }
  };

  // Handler for deleting homework (only available to teachers)
  const handleDelete = async (homeworkId) => {
    try {
      await deleteHomework(homeworkId);
      setHomework((prevHomework) =>
        prevHomework.filter((hw) => hw.id !== homeworkId)
      );
    } catch (err) {
      console.error("Error deleting homework:", err);
    }
  };

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

        {/* Upload form only visible for teachers */}
        {userRole === "teacher" && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-blue-500">
                Upload New Homework
              </span>
            </h2>
            <form
              onSubmit={handleUpload}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 max-w-4xl mx-auto transition-all duration-300 hover:bg-white hover:shadow-xl"
            >
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  Title:
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onBlur={handleAutoFill} // Optionally auto-fill description on blur
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none transition-all duration-300"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  Description:
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={aiLoading ? "Generating recommendation..." : recommendation || "Enter description here..."}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none transition-all duration-300 min-h-[100px]"
                />
                {/* Alternatively, you can offer a button to manually set the recommendation */}
                {recommendation && !description && (
                  <button
                    type="button"
                    onClick={() => setDescription(recommendation)}
                    className="mt-2 text-sm text-blue-500 hover:underline"
                  >
                    Use AI Recommendation
                  </button>
                )}
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  Upload File:
                </label>
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="w-full p-3 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-pink-500 file:text-white hover:file:bg-pink-600 transition-all duration-300"
                  required
                />
              </div>
              {uploadError && (
                <p className="text-red-500 mb-6 text-center">{uploadError}</p>
              )}
              <div className="text-center">
                <button
                  type="submit"
                  disabled={uploading}
                  className="bg-gradient-to-r from-pink-500 to-blue-500 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploading ? "Uploading..." : "Upload Homework"}
                </button>
              </div>
            </form>
          </div>
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
                <div
                  key={hw.id}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 transform transition-all duration-300 hover:scale-102 hover:shadow-xl hover:bg-white"
                >
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
                        onClick={() =>
                          handleDownload(hw.fileUrl, `${hw.title}.pdf`)
                        }
                        className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-blue-500 text-white font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                      >
                        Download
                      </button>
                      {userRole === "teacher" && (
                        <button
                          onClick={() => handleDelete(hw.id)}
                          className="inline-flex items-center px-4 py-2 rounded-full bg-red-500 text-white font-semibold hover:bg-red-600 hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomeworkList;
