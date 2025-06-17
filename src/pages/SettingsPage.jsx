import React, { useState, useEffect } from "react";
import { getStoredConfig, setStoredConfig } from "../utils/configStorage";
import { useFormatting, defaultConfig } from "../context/FormattingContext";

function SettingsPage() {
  const { config, setConfig } = useFormatting();
  const [saved, setSaved] = useState(false);

  const update = (field, value) => {
    setConfig((prev) => ({ ...prev, [field]: value }));
  };

  const toggleSection = (section) => {
    setConfig((prev) => ({
      ...prev,
      showSections: {
        ...prev.showSections,
        [section]: !prev.showSections[section],
      },
    }));
  };

  const handleSave = () => {
    setStoredConfig(config);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  useEffect(() => {
    document.title = "Resume Settings";
  }, []);

  return (
    <div className="settings-wrapper">
      <section className="settings-section">
        <h2>Export Typography</h2>
        <div className="settings-grid">
          <label>
            Font Family:
            <select
              value={config.fontFamily}
              onChange={(e) => update("fontFamily", e.target.value)}
            >
              <option value="Arial">Arial</option>
              <option value="Segoe UI">Segoe UI</option>
              <option value="Georgia">Georgia</option>
              <option value="Times New Roman">Times New Roman</option>
            </select>
          </label>

          <label>
            Font Size (px):
            <input
              type="number"
              value={parseInt(config.fontSize)}
              onChange={(e) => update("fontSize", `${e.target.value}px`)}
            />
          </label>

          <label>
            Line Spacing:
            <input
              type="number"
              step="0.1"
              value={config.lineSpacing}
              onChange={(e) => update("lineSpacing", parseFloat(e.target.value))}
            />
          </label>
        </div>
      </section>

      <section className="settings-section">
        <h2>Logo & Layout</h2>
        <div className="settings-grid">
          <label>
            Logo Width (px):
            <input
              type="number"
              value={parseInt(config.logoSize)}
              onChange={(e) => update("logoSize", `${e.target.value}px`)}
            />
          </label>

          <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "1.8rem" }}>
            <input
              type="checkbox"
              checked={config.showLogo}
              onChange={(e) => update("showLogo", e.target.checked)}
            />
            Show Logo
          </label>
        </div>
      </section>

      <section className="settings-section">
        <h2>Section Visibility</h2>
        <div className="settings-grid">
          {Object.keys(config.showSections).map((section) => (
            <label key={section} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <input
                type="checkbox"
                checked={config.showSections[section]}
                onChange={() => toggleSection(section)}
              />
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </label>
          ))}
        </div>
      </section>

      <div className="settings-actions">
        <button onClick={handleSave}>
          {saved ? "Saved!" : "Save Export Settings"}
        </button>
        <button onClick={() => setConfig(defaultConfig)} style={{ backgroundColor: "#888" }}>
          Reset to Default
        </button>
      </div>
    </div>
  );
}

export default SettingsPage;
