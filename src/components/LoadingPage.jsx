// src/components/LoadingPage.jsx
import React from "react";

function LoadingPage({ message = "Loading..." }) {
  return (
    <div className="flex items-center justify-center h-screen w-full bg-white text-gray-800">
      <div className="text-center">
        <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-lg font-medium">{message}</p>
      </div>
    </div>
  );
}

export default LoadingPage;
