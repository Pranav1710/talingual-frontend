// src/components/MasterLayout.jsx
import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

function MasterLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}

export default MasterLayout;
