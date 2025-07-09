import React from "react";
import CVUploader from "@/components/CVUploader";
import CVPreview from "@/components/CVPreview";
import ExportOptions from "@/components/ExportOptions";
import { useCV } from "@/context/CVProvider";

export default function CVFormatterPage() {
  const { cvHtml } = useCV();

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 flex justify-center">
      <div className="w-full max-w-6xl flex flex-col gap-10">

        {/* Upload + Export Row */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* Upload Form */}
          <div className="w-full lg:max-w-2xl">
            <CVUploader />
          </div>

          {/* Export Options */}
          <div className="w-full lg:w-80">
            {cvHtml && (
              <div className="bg-white shadow-sm border rounded-lg p-6">
                <ExportOptions />
              </div>
            )}
          </div>
        </div>

        {/* Divider */}
        {cvHtml && <hr className="border-gray-300" />}

        {/* CV Preview (full width) */}
        {cvHtml && (
          <div className="bg-white shadow-sm border rounded-lg p-6 overflow-auto max-h-[80vh]">
            <CVPreview />
          </div>
        )}
      </div>
    </div>
  );
}


