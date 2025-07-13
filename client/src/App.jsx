import React, { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [downloadLink, setDownloadLink] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !name) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);

    setLoading(true);
    setDownloadLink(null);

    try {
      const response = await axios.post(
        "http://localhost:8000/upload/",
        formData,
        {
          responseType: "blob",
        }
      );
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });
      const url = URL.createObjectURL(blob);
      setDownloadLink(url);
    } catch (err) {
      alert("Failed to generate feedback");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 to-white flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-teal-700 mb-6">
          AI Tutor Feedback
        </h1>
        <form onSubmit={handleUpload} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Student Name:
            </label>
            <input
              type="text"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Upload DOCX File:
            </label>
            <input
              type="file"
              accept=".docx"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
              onChange={(e) => setFile(e.target.files[0])}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:bg-teal-400"
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Feedback"}
          </button>
        </form>
        {downloadLink && (
          <a
            href={downloadLink}
            download="feedback.docx"
            className="mt-4 block text-center text-teal-600 hover:text-teal-800 underline"
          >
            Download Feedback File
          </a>
        )}
      </div>
    </div>
  );
}

export default App;
