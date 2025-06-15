import React, { useState } from "react";
import UploadForm from "../components/UploadForm";
import ResumePreview from "../components/ResumePreview";
import DownloadButtons from "../components/DownloadButtons";

function ResumeBuilder() {
  const [resumeHtml, setResumeHtml] = useState("");

  return (
    <div className="app-container">
      <UploadForm setResumeHtml={setResumeHtml} />

      {resumeHtml && (
        <>
          <ResumePreview html={resumeHtml} />
          <DownloadButtons html={resumeHtml} />
        </>
      )}
    </div>
  );
}

export default ResumeBuilder;
