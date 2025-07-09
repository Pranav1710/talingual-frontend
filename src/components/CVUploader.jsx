import React, { useState, useRef } from "react";
import { generateCV } from "@/services/cvService.js";
import { useCV } from "@/context/CVProvider";

export default function CVUploader() {
  const [file, setFile] = useState(null);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const { setCvHtml, setCvName } = useCV();

  const handleDrop = (e) => {
    e.preventDefault();
    const dropped = e.dataTransfer.files[0];
    if (dropped && isValidFile(dropped)) {
      setFile(dropped);
      inputRef.current.value = "";
    }
  };

  const handleBrowse = (e) => {
    const selected = e.target.files[0];
    if (selected && isValidFile(selected)) {
      setFile(selected);
    } else {
      e.target.value = "";
    }
  };

  const isValidFile = (f) => {
    const allowed = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (!allowed.includes(f.type)) {
      alert("Invalid file format. Only PDF or DOCX is allowed.");
      return false;
    }
    if (f.size > maxSize) {
      alert("File too large. Maximum allowed is 5MB.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please upload a CV first.");
    const API_URL = import.meta.env.VITE_API_URL;
    const formData = new FormData();
    formData.append("cv", file);
    formData.append("notes", notes);

    try {
      setLoading(true);
      setCvHtml("");
      setCvName(file.name.replace(/\.[^/.]+$/, "")); // remove extension
      const html = await generateCV(formData);
      setCvHtml(html);
    } catch (err) {
      console.error("CV generation failed:", err);

      if (err.response) {
        console.error("Backend responded with:", err.response.status, err.response.data);
        alert(`CV generation failed: ${err.response.data?.error || "Server error"}`);
      } else if (err.request) {
        console.error("No response from backend:", err.request);
        alert("CV generation failed: No response from server.");
      } else {
        alert("CV generation failed: " + err.message);
      }
    } finally {
      setLoading(false);
    }
  };


  const clearFile = () => {
    setFile(null);
    inputRef.current.value = "";
  };

  return (
    <div className="w-full bg-white shadow-md rounded-xl p-8">
      <form onSubmit={handleSubmit}>
        <label
          htmlFor="cv-upload"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="cursor-pointer border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 rounded-lg p-8 flex flex-col items-center justify-center transition"
        >
          {/* Icon */}
          <svg className="w-10 h-10 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <p className="text-gray-700 font-medium">Drag & drop your CV or click to browse</p>
          <p className="text-sm text-gray-500 mt-1">Accepted formats: PDF, DOCX (max 5MB)</p>
          <input
            id="cv-upload"
            type="file"
            accept=".pdf,.doc,.docx"
            ref={inputRef}
            className="hidden"
            onChange={handleBrowse}
          />
        </label>

        {file && (
          <div className="mt-3 text-sm text-center text-green-700">
            ✅ {file.name}
            <button type="button" onClick={clearFile} className="ml-2 text-red-500 underline">
              Remove
            </button>
          </div>
        )}

        <textarea
          rows="4"
          className="w-full mt-6 p-3 border border-gray-300 rounded-md focus:ring-1 focus:ring-gray-400"
          placeholder="Recruiter Notes (optional)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-6 bg-gray-800 text-white font-medium py-3 rounded-md hover:bg-gray-700 transition disabled:opacity-50"
        >
          {loading ? "Generating CV..." : "Generate CV"}
        </button>
      </form>
    </div>
  );
}
