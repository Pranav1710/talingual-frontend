import React, { useState, useEffect } from "react";
import {
  getCVConfig,
  setCVConfig,
  resetCVConfig,
  clearCVConfig,
} from "@/services/api";
import { useCV } from "@/context/CVProvider";

export default function SettingsPanel() {
  const [config, setConfig] = useState(null);
  const [saving, setSaving] = useState(false);
  const { cvConfig, setCvConfig } = useCV();

  useEffect(() => {
    getCVConfig().then((res) => {
      setConfig(res?.data || {});  // fallback to empty object to avoid null
    }).catch(err => {
      setConfig({});
    });

  }, []);

  const update = (key, value) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  const toggleSection = (section) => {
    setConfig((prev) => ({
      ...prev,
      sectionVisibility: {
        ...prev.sectionVisibility,
        [section]: !prev.sectionVisibility[section],
      },
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    await setCVConfig(config);
    setSaving(false);
  };

  if (!config) return <p>Loading settings…</p>;

  return (
    <div className="bg-white shadow-sm border rounded-lg p-6 space-y-6">

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Font Size</label>
          <input
            type="text"
            value={config.fontSize}
            onChange={(e) => update("fontSize", e.target.value)}
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Line Height</label>
          <input
            type="text"
            value={config.lineSpacing}
            onChange={(e) => update("lineSpacing", e.target.value)}
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Logo Size (px)</label>
          <input
            type="text"
            value={config.logoSize}
            onChange={(e) => update("logoSize", e.target.value)}
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>


        <div className="flex items-center gap-2 mt-6 sm:mt-0">
          <input
            type="checkbox"
            checked={config.showLogo}
            onChange={() => update("showLogo", !config.showLogo)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <span className="text-sm text-gray-700">Show Logo</span>
        </div>
      </div>

      {/* <div>
        <h3 className="text-lg font-medium text-gray-800 mb-2">Visible Sections</h3>
        <div className="flex flex-wrap gap-4">
          {Object.entries(config.sectionVisibility || {}).map(([key, value]) => (
            <label key={key} className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={value}
                onChange={() => toggleSection(key)}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              {key.replace(/_/g, " ")}
            </label>
          ))}
        </div>
      </div> */}

      <div className="flex gap-4 pt-2">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? "Saving..." : "Save Settings"}
        </button>

        <button
          className="border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-100 transition"
          onClick={resetCVConfig}
        >
          Reset to Default
        </button>
      </div>

    </div>
  );

}
