// context/FormattingContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { getStoredConfig, setStoredConfig } from "../utils/configStorage";

export const defaultConfig = {
  fontFamily: "Arial",
  fontSize: "11px",
  lineSpacing: 1.15,
  logoSize: "250px",
  showLogo: true,
  showSections: {
    profile: true,
    education: true,
    experience: true,
    additional: true,
  },
};

const FormattingContext = createContext(null);

export const useFormatting = () => useContext(FormattingContext);

export function FormattingProvider({ children }) {
  const [config, setConfig] = useState(() => getStoredConfig() || defaultConfig);

  useEffect(() => {
    setStoredConfig(config);
  }, [config]);

  return (
    <FormattingContext.Provider value={{ config, setConfig }}>
      {children}
    </FormattingContext.Provider>
  );
}
