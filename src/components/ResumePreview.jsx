import React, { useEffect, useState } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function ResumePreview({ html, config }) {
  const [pdfUrl, setPdfUrl] = useState(null);

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  useEffect(() => {
    const generatePdf = async () => {
      try {
        const res = await fetch(`${API_URL}/export-pdf`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            html,
            config,
            name: "Talingual_Resume"
          })
        });

        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
      } catch (err) {
        console.error("Failed to load PDF preview", err);
      }
    };

    if (html) {
      generatePdf();
    }
  }, [html, config]);

  if (!pdfUrl) {
    return <div className="pdf-loading">Generating preview...</div>;
  }

  return (
    <div className="pdf-wrapper" style={{ height: "90vh", border: "1px solid #ccc", background: "#f2f2f2" }}>
      <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
        <Viewer
          fileUrl={pdfUrl}
          plugins={[defaultLayoutPluginInstance]}
        />
      </Worker>
    </div>
  );
}

export default ResumePreview;
