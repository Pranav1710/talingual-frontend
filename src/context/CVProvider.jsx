import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const CVContext = createContext();

export function CVProvider({ children }) {
  const [cvHtml, setCvHtml] = useState(null);
  const [cvName, setCvName] = useState("");
  const [cvConfig, setCvConfig] = useState(null);
  const [configLoading, setConfigLoading] = useState(true);

  useEffect(() => {
    const loadConfig = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/config/get`, {
          withCredentials: true,
        });
        setCvConfig(res.data);
      } catch (err) {
        console.error("Failed to load CV config:", err);
        setCvConfig(null); // fallback
      } finally {
        setConfigLoading(false);
      }
    };

    loadConfig();
  }, []);

  return (
    <CVContext.Provider
      value={{
        cvHtml,
        setCvHtml,
        cvName,
        setCvName,
        cvConfig,
        setCvConfig,
        configLoading,
      }}
    >
      {children}
    </CVContext.Provider>
  );
}

export const useCV = () => {
  const context = useContext(CVContext);
  if (!context) throw new Error("useCV must be used inside a <CVProvider>");
  return context;
};
