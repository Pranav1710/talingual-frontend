// context/FormattingContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { getStoredConfig, setStoredConfig } from "../utils/configStorage";

export const defaultConfig = {
  fontFamily: "Arial",
  fontSize: "11px",
  lineSpacing: 1,
  logoSize: "250px",
  showLogo: true,
  promptInstructions: "",
  showSections: {
    // profile: true,
    education: true,
    experience: true,
    additional: true,
  },
};


const FormattingContext = createContext(null);

export const useFormatting = () => useContext(FormattingContext);

export function FormattingProvider({ children }) {
  const [config, setConfig] = useState(() => getStoredConfig() || defaultConfig);
  const [resumeHtml, setResumeHtml] = useState("");
  const [resumeName, setResumeName] = useState(""); // ✅ Add this line

  useEffect(() => {
    setStoredConfig(config);
  }, [config]);

  return (
    <FormattingContext.Provider
      value={{
        config,
        setConfig,
        resumeHtml,
        setResumeHtml,
        resumeName,        // ✅ include
        setResumeName      // ✅ include
      }}
    >
      {children}
    </FormattingContext.Provider>
  );
}

