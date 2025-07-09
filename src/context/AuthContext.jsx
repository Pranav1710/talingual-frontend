// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;

  const refreshAuth = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/auth/is-authenticated`, {
        withCredentials: true,
      });
      setIsAuthenticated(res.data.authenticated);
    } catch {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    refreshAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, refreshAuth }}>
      {children}
    </AuthContext.Provider>
  );
}


export function useAuth() {
  return useContext(AuthContext);
}
