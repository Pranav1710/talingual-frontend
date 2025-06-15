// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import ResumeBuilder from "./pages/ResumeBuilder";
import SettingsPage from "./pages/SettingsPage";
import MasterLayout from "./components/MasterLayout";

function App() {
  return (
    <MasterLayout>
      <Routes>
        <Route path="/" element={<ResumeBuilder />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </MasterLayout>
  );
}

export default App;
