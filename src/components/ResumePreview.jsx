import React from "react";

function ResumePreview({ html }) {
  return (
    <div className="resume-preview-wrapper">
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}

export default ResumePreview;
