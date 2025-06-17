import React from "react";
import { useEffect } from "react";
import UploadForm from "../components/UploadForm";
import ResumePreview from "../components/ResumePreview";
import DownloadButtons from "../components/DownloadButtons";
import { useFormatting } from "../context/FormattingContext";
import "./ResumeBuilder.css";

function ResumeBuilder() {
  const {
  resumeHtml,
  setResumeHtml,
  config,
  setConfig,
  resumeName,
  setResumeName,
} = useFormatting();

  useEffect(() => {
    const html = localStorage.getItem("resumeHtml");
    const config = localStorage.getItem("resumeConfig");
    const name = localStorage.getItem("resumeName");

    if (html && config && name) {
      setResumeHtml(html);
      setConfig(JSON.parse(config));
      setResumeName(name);

      localStorage.removeItem("resumeHtml");
      localStorage.removeItem("resumeConfig");
      localStorage.removeItem("resumeName");
    }
  }, []);

  return (
    <div className="resume-builder-container">
      <div className="top-section">
        <div className="form-column">
          <UploadForm setResumeHtml={setResumeHtml} />
        </div>
        <div className="export-column">
          {resumeHtml && <DownloadButtons html={resumeHtml} />}
        </div>
      </div>

      <div className="preview-section">
        {resumeHtml ? (
          <ResumePreview html={resumeHtml} />
        ) : (
          <p className="placeholder-text">⬆️ Upload a resume to preview it here</p>
        )}
      </div>
    </div>
  );
}

export default ResumeBuilder;
