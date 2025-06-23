import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;


const GoogleAuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const resumeHtml = localStorage.getItem("resumeHtml");
    const resumeConfig = localStorage.getItem("resumeConfig");
    const resumeName = localStorage.getItem("resumeName");

    const openAndReturn = async () => {
      if (!resumeHtml || !resumeConfig || !resumeName) {
        navigate("/");
        return;
      }

      try {
        const ping = await axios.get(`${API_URL}/is-authenticated`, {
          withCredentials: true,
        });

        if (ping.data.authenticated) {
          const res = await axios.post(
            `${API_URL}/api/open-in-google-docs`,
            {
              html: resumeHtml,
              config: JSON.parse(resumeConfig),
              name: resumeName,
            },
            { withCredentials: true }
          );

          if (res.data.url) {
            const anchor = document.createElement("a");
            anchor.href = res.data.url;
            anchor.target = "_blank";
            anchor.rel = "noreferrer";
            anchor.click();
          }

          // Navigate back to app after opening
          setTimeout(() => navigate("/"), 2000);
        } else {
          navigate("/");
        }
      } catch (err) {
        console.error("Failed to open in Google Docs:", err);
        navigate("/");
      }
    };

    openAndReturn();
  }, [navigate]);

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <p>⏳ Opening your resume in Google Docs...</p>
      <p>Redirecting you back to the app.</p>
    </div>
  );
};

export default GoogleAuthSuccess;
