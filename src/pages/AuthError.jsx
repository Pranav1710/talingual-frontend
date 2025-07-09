// src/pages/AuthError.jsx
import { useSearchParams } from "react-router-dom";

export default function AuthError() {
  const [params] = useSearchParams();
  const errorMsg = params.get("msg") || "Unknown authentication error.";

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-6">
      <h1 className="text-3xl font-bold text-red-600 mb-4">Login Error</h1>
      <p className="text-lg">{decodeURIComponent(errorMsg)}</p>
      <a href="/" className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Back to Home
      </a>
    </div>
  );
}
