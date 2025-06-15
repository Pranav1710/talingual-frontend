import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function UploadForm({ setResumeHtml }) {
  const [file, setFile] = useState(null);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please upload a file.");

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("notes", notes);

    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/generate-resume`, formData);
      setResumeHtml(res.data.formatted_html);
    } catch (err) {
      console.error("Upload error:", err);
      alert("Resume generation failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="upload-form">
      <div className="upload-box" {...getRootProps()}>
        <input {...getInputProps()} />
        <div className="upload-icon">📄</div>
        {isDragActive ? (
          <p className="upload-text">Drop your resume here...</p>
        ) : file ? (
          <p className="upload-text">Selected: {file.name}</p>
        ) : (
          <>
            <p className="upload-text">Drag & drop your resume here, or click to browse</p>
            <p className="upload-subtext">Accepted formats: PDF, DOCX</p>
          </>
        )}
      </div>

      {/* <label htmlFor="notes">Recruiter Notes (optional)</label> */}
      <textarea
        id="notes"
        placeholder="Recruiter Notes (optional)"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        rows={4}
        className="notes-input"
      />

      <button type="submit" className="submit-button" disabled={loading}>
        {loading ? "Processing..." : "Generate Resume"}
      </button>
    </form>
  );
}

export default UploadForm;
