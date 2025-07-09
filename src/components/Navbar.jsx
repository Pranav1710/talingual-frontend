import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";


const API_URL = import.meta.env.VITE_API_URL;


function Navbar() {
  const navigate = useNavigate();
  const { refreshAuth } = useAuth();

    async function handleLogout() {
    try {
      await axios.post(`${API_URL}/api/auth/logout`, {}, { withCredentials: true });
      await refreshAuth(); 
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err.response?.data || err.message);
      // Optionally show a toast or alert
    }
  }

  return (
    <header className="w-full bg-white shadow-sm">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2">
          <img src={logo} alt="Talingual Logo" className="h-10" />
        </NavLink>

        {/* Navigation */}
        <nav className="flex items-center gap-6">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `text-sm ${isActive ? "text-blue-600 font-medium" : "text-gray-700 hover:text-blue-600"}`
            }
          >
            Format
          </NavLink>

          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `text-sm ${isActive ? "text-blue-600 font-medium" : "text-gray-700 hover:text-blue-600"}`
            }
          >
            Settings
          </NavLink>

          <button onClick={handleLogout} className="text-sm text-red-500 hover:text-red-600">
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;

