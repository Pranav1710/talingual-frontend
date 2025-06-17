import React from "react";
import axios from "axios";
import { useFormatting } from "../context/FormattingContext";
import "./DownloadButtons.css"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function DownloadButtons({ html }) {
  const { config } = useFormatting();

  function extractNameFromHtml(html) {
    try {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = html;
      const nameTag = tempDiv.querySelector("p.info-field");
      if (nameTag && nameTag.textContent.startsWith("Name:")) {
        const fullName = nameTag.textContent.replace("Name:", "").trim();
        return fullName || "Talingual_Resume";
      }
    } catch (e) {
      console.error("Failed to extract name:", e);
    }
    return "Talingual_Resume";
  }

  const download = async (type) => {
    const extractedName = extractNameFromHtml(html);

    try {
      const res = await axios.post(
        `${API_URL}/export-${type}`,
        { html, config, name: extractedName },
        { responseType: "blob" }
      );

      let filename = `talingual_resume.${type}`;
      const disposition = res.headers["content-disposition"];

      if (disposition) {
        const utf8Match = disposition.match(/filename\*=UTF-8''([^;]+)/);
        if (utf8Match && utf8Match[1]) {
          filename = decodeURIComponent(utf8Match[1]);
        } else {
          const asciiMatch = disposition.match(/filename="?([^"]+)"?/);
          if (asciiMatch && asciiMatch[1]) {
            filename = asciiMatch[1];
          }
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

const openGoogleDoc = async ({ html, config, extractNameFromHtml }) => {
  const name = extractNameFromHtml(html);

  // Save to resume later after auth
  localStorage.setItem("resumeHtml", html);
  localStorage.setItem("resumeConfig", JSON.stringify(config));
  localStorage.setItem("resumeName", name);

  try {
    // First check if user is authenticated
    const ping = await axios.get(`${API_URL}/is-authenticated`, { withCredentials: true });

    if (ping.data.authenticated) {
      // Call open-in-google-docs directly
      const res = await axios.post(
        `${API_URL}/api/open-in-google-docs`,
        { html, config, name },
        { withCredentials: true }
      );

      if (res.data.url) {
        const anchor = document.createElement("a");
        anchor.href = res.data.url;
        anchor.target = "_blank";
        anchor.rel = "noreferrer";
        anchor.click();
      } else {
        alert("Could not open in Google Docs.");
      }

    } else {
      const { data } = await axios.get(`${API_URL}/auth-url`, { withCredentials: true });
      const anchor = document.createElement("a");
      anchor.href = data.auth_url;
      anchor.rel = "noreferrer";
      anchor.click();
    }
  } catch (err) {
    console.error("Fatal openGoogleDoc error:", err);
    alert("Something went wrong while opening your resume.");
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
        <button onClick={() => openGoogleDoc({ html, config, extractNameFromHtml })} className="download-button">
          📂 Open in Google Docs
        </button>
      </div>
    </div>
  );
}

export default DownloadButtons;
