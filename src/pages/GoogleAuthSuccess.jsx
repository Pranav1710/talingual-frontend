import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

export default function GoogleAuthSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/"); // Redirect to ResumeBuilder
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center px-4">
      <CheckCircle className="w-16 h-16 text-green-600 mb-4" />
      <h1 className="text-2xl font-semibold text-gray-800 mb-2">
        Google Drive Connected
      </h1>
      <p className="text-gray-600">
        You’re all set. Redirecting you back to your resume...
      </p>
    </div>
  );
}
