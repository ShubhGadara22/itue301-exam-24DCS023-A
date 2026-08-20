import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("medcare_token") || null);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  // Check and restore user session on mount
  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          const response = await fetch(`${API_URL}/api/v1/auth/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const result = await response.json();
            setUser(result.user);
          } else {
            // Token invalid or expired
            localStorage.removeItem("medcare_token");
            setToken(null);
            setUser(null);
          }
        } catch (err) {
          console.error("Auth check failed:", err);
        }
      }
      setLoading(false);
    };

    loadUser();
  }, [token, API_URL]);

  // Login handler
  const login = async (email, password) => {
    const response = await fetch(`${API_URL}/api/v1/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Invalid email or password");
    }

    localStorage.setItem("medcare_token", result.token);
    setToken(result.token);
    setUser(result.user);
    return result.user;
  };

  // Signup handler
  const signup = async (name, email, password) => {
    const response = await fetch(`${API_URL}/api/v1/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Unable to create account");
    }

    localStorage.setItem("medcare_token", result.token);
    setToken(result.token);
    setUser(result.user);
    return result.user;
  };

  // Logout handler
  const logout = async () => {
    try {
      await fetch(`${API_URL}/api/v1/auth/logout`, { method: "POST" });
    } catch (err) {
      // Ignore network errors on logout
    }
    localStorage.removeItem("medcare_token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
