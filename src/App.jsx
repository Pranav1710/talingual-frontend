// src/App.jsx
import React from "react";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import ResumeBuilder from "./pages/ResumeBuilder";
import SettingsPage from "./pages/SettingsPage";
import GoogleAuthSuccess from "./pages/GoogleAuthSuccess";
import MasterLayout from "./components/MasterLayout";

function App() {
  useEffect(() => {
    const token = document.cookie.includes("google_token");
    if (token) {
      toast.success("Google Drive connected!");
    }
  }, []);

  return (
    <MasterLayout>
      <Routes>
        <Route path="/" element={<ResumeBuilder />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/google-auth-success" element={<GoogleAuthSuccess />} />
         <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </MasterLayout>
  );
}

export default App;
