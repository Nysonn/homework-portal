import React, { useState } from "react";
import useAiRecommendation from "../../hooks/useAiRecommendation";
import { uploadHomework } from "../../api/homeworkAPI";

const HomeworkUploadForm = ({ className, subjectName, setHomework }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  // Get AI recommendation hook whenever the title changes
  const { recommendation, loading: aiLoading } = useAiRecommendation(title);

  // Auto-fill the description if it is empty on blur
  const handleAutoFill = () => {
    if (!description && recommendation) {
      setDescription(recommendation);
    }
  };

  // Handler for uploading homework
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

  return (
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
            onBlur={handleAutoFill} // Auto-fill description on blur if empty
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
            placeholder={
              aiLoading
                ? "Generating recommendation..."
                : recommendation || "Enter description here..."
            }
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none transition-all duration-300 min-h-[100px]"
          />
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
  );
};

export default HomeworkUploadForm;
