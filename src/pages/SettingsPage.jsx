// src/pages/SettingsPage.jsx
import React from "react";
import SettingsPanel from "@/components/SettingsPanel";

export default function SettingsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">CV Settings</h1>
      <SettingsPanel />
    </div>
  );
}
