import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// TASK 2 & AUTH: Navbar Component with Custom Healthcare Logo & User Menu
const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    setMenuOpen(false);
    navigate("/");
  };

  // Helper to extract user initials for avatar
  const getUserInitials = (name) => {
    if (!name) return "U";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Custom Logo & Brand */}
        <Link to="/" className="navbar-brand">
          <svg
            className="brand-svg-logo"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="40" height="40" rx="10" fill="#F4EEF7" />
            <path
              d="M10 26V14L16 22L22 14V26"
              stroke="#5B3A6D"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M22 22H27L29 18L31 25L33 22H35"
              stroke="#E58B73"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div>
            <span className="brand-name-plum">MedCare</span>
            <span className="brand-name-coral">Plus</span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav>
          <ul className="navbar-links">
            <li>
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/doctors"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Doctors
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/booking"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Book Appointment
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Auth User Menu */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {isAuthenticated ? (
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="btn btn-secondary"
                style={{
                  padding: "6px 14px",
                  fontSize: "0.85rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span className="user-avatar-circle">
                  {getUserInitials(user?.name)}
                </span>
                <span>{user?.name ? user.name.split(" ")[0] : "User"} ▼</span>
              </button>

              {menuOpen && (
                <div
                  style={{
                    position: "absolute",
                    right: 0,
                    top: "46px",
                    background: "var(--surface)",
                    border: "1px solid var(--border-color)",
                    borderRadius: "var(--radius-md)",
                    boxShadow: "var(--shadow-md)",
                    padding: "16px",
                    minWidth: "200px",
                    zIndex: 100,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                    <span className="user-avatar-circle" style={{ width: "38px", height: "38px" }}>
                      {getUserInitials(user?.name)}
                    </span>
                    <div>
                      <p style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-main)" }}>
                        {user?.name}
                      </p>
                      <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", wordBreak: "break-all" }}>
                        {user?.email}
                      </p>
                    </div>
                  </div>

                  <hr style={{ border: 0, borderTop: "1px solid var(--border-color)", marginBottom: "12px" }} />

                  <button
                    onClick={handleLogout}
                    className="btn btn-full"
                    style={{
                      backgroundColor: "var(--status-cancelled-bg)",
                      color: "var(--status-cancelled-text)",
                      border: "1px solid var(--status-cancelled-border)",
                      padding: "8px 12px",
                      fontSize: "0.85rem",
                      boxShadow: "none",
                    }}
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
                className="nav-link"
                style={{ fontSize: "0.9rem" }}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="btn btn-accent"
                style={{ padding: "8px 18px", fontSize: "0.85rem" }}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
