import React, { useEffect, useState } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { zoomPlugin } from "@react-pdf-viewer/zoom";
import { useCV } from "@/context/CVProvider";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const API_URL = import.meta.env.VITE_API_URL;

export default function CVPreview() {
    const { cvHtml, cvConfig } = useCV();
    const [pdfUrl, setPdfUrl] = useState(null);

    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const zoomPluginInstance = zoomPlugin(); // ✅ initialize zoom plugin
    const { zoomTo } = zoomPluginInstance;   // ✅ destructure after creating it

     useEffect(() => {
        if (!cvHtml) return;

        const generatePdf = async () => {
            try {
                const res = await fetch(`${API_URL}/api/cv/export-pdf`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        html: cvHtml,
                        config: cvConfig,
                        name: "Talingual_Resume",
                    }),
                    credentials: "include",
                });

                if (!res.ok) throw new Error("Failed to generate PDF");

                const blob = await res.blob();
                const url = URL.createObjectURL(blob);
                setPdfUrl(url);
            } catch (err) {
                console.error("Error generating PDF:", err);
            }
        };

        const timeout = setTimeout(() => {
            generatePdf();
        }, 300); // 300ms debounce delay

        return () => clearTimeout(timeout); // Cleanup previous timeout
    }, [cvHtml, cvConfig]);


    // Set default zoom on mount when PDF is ready
    useEffect(() => {
        if (pdfUrl) {
            zoomTo(1.0); // 100% zoom level
        }
    }, [pdfUrl, zoomTo]);

    if (!pdfUrl) {
        return <div className="text-center p-4">Generating preview...</div>;
    }

    return (
        <div className="pdf-wrapper" style={{ height: "90vh", border: "1px solid #ccc", background: "#f2f2f2" }}>
            <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
                <Viewer
                    fileUrl={pdfUrl}
                    plugins={[defaultLayoutPluginInstance, zoomPluginInstance]}
                />
            </Worker>
        </div>
    );
}
