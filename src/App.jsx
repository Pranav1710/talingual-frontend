import { Routes, Route } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

import LoginPage from "@/pages/LoginPage";
import CVFormatterPage from "@/pages/CVFormatterPage";
import SettingsPage from "@/pages/SettingsPage";
import AuthError from "@/pages/AuthError";
import MasterLayout from "./components/MasterLayout";

export default function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/auth-error" element={<AuthError />} />

      <Route
        element={<ProtectedRoute isAuthenticated={isAuthenticated} />}
      >
        <Route element={<MasterLayout />}>
          <Route index element={<CVFormatterPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
