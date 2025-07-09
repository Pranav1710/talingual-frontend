// services/exportService.js
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const exportPDF = async (html, name) => {
  const res = await axios.post(
    `${API_URL}/api/cv/export-pdf`,
    { html },
    { responseType: "blob", withCredentials: true }
  );
  const filename = getFilenameFromHeaders(res.headers) || "resume.pdf";
  triggerDownload(res.data, filename);
};

export const exportDOCX = async (html, name) => {
  const res = await axios.post(
    `${API_URL}/api/cv/export-docx`,
    { html },
    { responseType: "blob", withCredentials: true }
  );
  const filename = getFilenameFromHeaders(res.headers) || "resume.docx";
  triggerDownload(res.data, filename);
};

export const openInGoogleDocs = async (html) => {
  const res = await axios.post(
    `${API_URL}/api/cv/open-in-google-docs`,
    { html },
    { withCredentials: true }
  );
  window.open(res.data.google_docs_url, "_blank");
};

function triggerDownload(blobData, filename) {
  const url = window.URL.createObjectURL(new Blob([blobData]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  link.remove();
}
function getFilenameFromHeaders(headers) {
  const contentDisposition = headers["content-disposition"];
  if (!contentDisposition) return null;

  const match = contentDisposition.match(/filename="?([^"]+)"?/);
  return match ? match[1] : null;
}
