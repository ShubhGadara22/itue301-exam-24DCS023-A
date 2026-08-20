import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect to page state if coming from protected route
  const from = location.state?.from?.pathname || "/";
  const redirectNotice = location.state?.message || "";

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("Please fill in both email and password.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      await login(formData.email, formData.password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ display: "flex", justifyContent: "center" }}>
      <div className="booking-card" style={{ width: "100%", maxWidth: "460px" }}>
        <div className="booking-header">
          <span className="hero-tag">MedCare Plus Auth</span>
          <h1 className="booking-title" style={{ marginTop: "8px" }}>Welcome back</h1>
          <p className="booking-subtitle">
            Sign in to continue managing your appointments.
          </p>
        </div>

        {redirectNotice && (
          <div className="alert-success" style={{ backgroundColor: "#fef3c7", borderColor: "#fde68a", color: "#b45309" }}>
            {redirectNotice}
          </div>
        )}

        {error && (
          <div className="state-container error-state" style={{ padding: "14px", marginBottom: "20px" }}>
            <p style={{ color: "#b91c1c", fontWeight: 600, fontSize: "0.9rem" }}>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. john@example.com"
              disabled={loading}
              required
            />
          </div>

          <div className="form-group">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <label htmlFor="password" style={{ margin: 0 }}>Password *</label>
              <Link to="/forgot-password" style={{ fontSize: "0.8rem", color: "var(--primary)", textDecoration: "none" }}>
                Forgot password?
              </Link>
            </div>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                disabled={loading}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  color: "var(--text-muted)",
                  fontSize: "0.8rem",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-full"
            style={{ marginTop: "12px" }}
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div style={{ marginTop: "24px", textAlign: "center", fontSize: "0.9rem", color: "var(--text-muted)" }}>
          Don't have an account?{" "}
          <Link to="/signup" style={{ color: "var(--primary)", fontWeight: 600, textDecoration: "none" }}>
            Create account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
