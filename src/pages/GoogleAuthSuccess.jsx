import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/open-in-google-docs`,
          {
            html: resumeHtml,
            config: JSON.parse(resumeConfig),
            name: resumeName
          },
          { withCredentials: true }
        );

        if (res.data.url) {
          // Open in new tab
          const anchor = document.createElement("a");
          anchor.href = res.data.url;
          anchor.target = "_blank";
          anchor.rel = "noreferrer";
          anchor.click();
        }

        // ✅ Return to homepage with resume loaded
        setTimeout(() => {
          navigate("/");
        }, 800); // small delay to allow doc to open

      } catch (err) {
        console.error("Failed to open doc:", err);
        navigate("/");
      }
    };

    openAndReturn();
  }, []);

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <p>⏳ Opening your resume in Google Docs...</p>
      <p>Redirecting you back to the app.</p>
    </div>
  );
};

export default GoogleAuthSuccess;
