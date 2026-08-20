import React, { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setMessage("");

      const response = await fetch(`${API_URL}/api/v1/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();
      setMessage(
        result.message ||
          "If an account exists for this email, a password reset link has been sent."
      );
    } catch (err) {
      setError("Unable to process request. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ display: "flex", justifyContent: "center" }}>
      <div className="booking-card" style={{ width: "100%", maxWidth: "460px" }}>
        <div className="booking-header">
          <span className="hero-tag">Password Recovery</span>
          <h1 className="booking-title" style={{ marginTop: "8px" }}>Forgot your password?</h1>
          <p className="booking-subtitle">
            Enter your email and we'll send you a password reset link.
          </p>
        </div>

        {message && (
          <div className="alert-success" style={{ marginBottom: "20px" }}>
            <h3 style={{ fontSize: "1rem", marginBottom: "4px" }}>✓ Check your email</h3>
            <p style={{ fontSize: "0.85rem" }}>{message}</p>
          </div>
        )}

        {error && (
          <div className="state-container error-state" style={{ padding: "14px", marginBottom: "20px" }}>
            <p style={{ color: "#b91c1c", fontWeight: 600, fontSize: "0.9rem" }}>{error}</p>
          </div>
        )}

        {!message && (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. john@example.com"
                disabled={loading}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-full"
              style={{ marginTop: "12px" }}
              disabled={loading}
            >
              {loading ? "Sending Link..." : "Send Reset Link"}
            </button>
          </form>
        )}

        <div style={{ marginTop: "24px", textAlign: "center", fontSize: "0.9rem" }}>
          <Link to="/login" style={{ color: "var(--primary)", fontWeight: 600, textDecoration: "none" }}>
            ← Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
