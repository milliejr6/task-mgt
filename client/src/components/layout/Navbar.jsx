// src/components/layout/Navbar.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="bg-indigo-900 text-white px-6 py-3 flex justify-between items-center shadow-md sticky top-0 z-50">
      <Link
        to="/"
        className="text-xl font-bold hover:text-indigo-200 transition-colors"
      >
        Task Mg't
      </Link>

      <div className="flex items-center gap-4 relative">
        <Link to="/" className="hover:text-indigo-200 transition-colors">
          Home
        </Link>

        {token ? (
          <div className="relative">
            {/* Profile icon */}
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="bg-indigo-800 rounded-full w-8 h-8 flex items-center justify-center hover:bg-indigo-700 transition-colors"
            >
              👤
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-3 w-36 bg-indigo-700 text-white rounded shadow-lg z-50">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-red-600 transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link
              to="/login"
              className="hover:text-indigo-200 transition-colors"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="hover:text-indigo-200 transition-colors"
            >
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
