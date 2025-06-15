import React from "react";
import axios from "axios";
import { useFormatting } from "../context/FormattingContext";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function DownloadButtons({ html }) {
  const { config } = useFormatting(); // 🔧 Get config from context

  const download = async (type) => {
    try {
      const res = await axios.post(
        `${API_URL}/export-${type}`,
        { html, config },
        { responseType: "blob" }
      );

      // Extract filename from Content-Disposition if available
      const disposition = res.headers["content-disposition"];
      let filename = `talingual_resume.${type}`;
      if (disposition && disposition.includes("filename=")) {
        const match = disposition.match(/filename="?(.+?)"?$/);
        if (match && match[1]) {
          filename = match[1];
        }
      }

      const blob = new Blob([res.data], {
        type:
          type === "pdf"
            ? "application/pdf"
            : "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      link.click();
    } catch (err) {
      console.error(`Download ${type} failed:`, err);
      alert(`Failed to export ${type.toUpperCase()}`);
    }
  };

  const openGoogleDoc = async () => {
    try {
      const res = await axios.post(`${API_URL}/api/open-in-google-docs`, {
        html,
        config,
      });

      if (res.data.url) {
        window.open(res.data.url, "_blank");
      } else {
        alert("Could not open in Google Docs.");
      }
    } catch (err) {
      console.error("Google Docs error:", err);
      alert("Failed to open in Google Docs.");
    }
  };

  return (
    <div className="download-section">
      <h2>📤 Export Options</h2>
      <div className="download-buttons">
        <button onClick={() => download("pdf")} className="download-button">
          📄 Download PDF
        </button>
        <button onClick={() => download("docx")} className="download-button">
          📝 Download DOCX
        </button>
        <button onClick={openGoogleDoc} className="download-button">
          📂 Open in Google Docs
        </button>
      </div>
    </div>
  );
}

export default DownloadButtons;

