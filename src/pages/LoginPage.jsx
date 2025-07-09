import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import "./LoginPage.css";

const API_URL = import.meta.env.VITE_API_URL;

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  // ✅ Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && location.pathname === "/login") {
      navigate("/");
    }
  }, [isAuthenticated, location.pathname, navigate]);

  const handleGoogleLogin = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/auth/auth-url`, {
        withCredentials: true,
      });
      if (res.data?.auth_url) {
        window.location.href = res.data.auth_url;
      } else {
        alert("Failed to initiate Google login.");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  if (isAuthenticated === null) {
    return (
      <div className="login-container">
        <p className="text-gray-500 text-sm">Checking authentication...</p>
      </div>
    );
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Talingual CV</h1>
        <p className="login-subtext">
          Sign in with Talingual account to continue
        </p>
        <button className="google-login-button" onClick={handleGoogleLogin}>
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google"
            className="google-icon"
          />
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
