import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.jpg";

function MasterLayout({ children }) {
  const location = useLocation();

  return (
    <div>
      <header className="app-header">
        <div className="header-container">
          <div className="header-left">
            <img src={logo} alt="Talingual Logo" className="logo-img" />
          </div>
          <nav className="nav-links">
            <Link to="/" className={location.pathname === "/" ? "active" : ""}>Formatter</Link>
            <Link to="/settings" className={location.pathname === "/settings" ? "active" : ""}>Settings</Link>
          </nav>
        </div>
      </header>

      <main className="main-content">
        {children}
      </main>
    </div>
  );
}

export default MasterLayout;
