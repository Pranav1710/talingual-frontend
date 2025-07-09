import React from "react";
import { useCV } from "@/context/CVProvider";
import { exportPDF, exportDOCX, openInGoogleDocs } from "@/services/exportService";

export default function ExportOptions() {
  const { cvHtml, cvName, cvConfig } = useCV();

  const handleExport = async (type) => {
    try {
      if (type === "pdf") await exportPDF(cvHtml, cvName);
      if (type === "docx") await exportDOCX(cvHtml, cvName);
      if (type === "google") await openInGoogleDocs(cvHtml, cvName);
    } catch (err) {
      alert("Export failed.");
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-900">Export Options</h3>
      <button
        onClick={() => handleExport("pdf")}
        className="w-full bg-gray-900 text-white py-3 rounded-md hover:bg-gray-800"
      >
        📄 Download PDF
      </button>
      <button
        onClick={() => handleExport("docx")}
        className="w-full bg-gray-900 text-white py-3 rounded-md hover:bg-gray-800"
      >
        📄 Download DOCX
      </button>
      <button
        onClick={() => handleExport("google")}
        className="w-full bg-gray-900 text-white py-3 rounded-md hover:bg-gray-800"
      >
        📂 Open in Google Docs
      </button>
    </div>
  );
}
