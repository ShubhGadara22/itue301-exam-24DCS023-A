import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";

const ResetPasswordPage = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newPassword) {
      setError("Please enter a new password.");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/api/v1/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "This password reset link has expired.");
      }

      setSuccess(true);
    } catch (err) {
      setError(err.message || "This password reset link has expired.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ display: "flex", justifyContent: "center" }}>
      <div className="booking-card" style={{ width: "100%", maxWidth: "460px" }}>
        <div className="booking-header">
          <span className="hero-tag">Set New Password</span>
          <h1 className="booking-title" style={{ marginTop: "8px" }}>Create a new password</h1>
          <p className="booking-subtitle">
            Enter your new password to regain access to your account.
          </p>
        </div>

        {success ? (
          <div style={{ textAlign: "center" }}>
            <div className="alert-success" style={{ marginBottom: "20px" }}>
              <h3 style={{ fontSize: "1.05rem", marginBottom: "4px" }}>✓ Password Reset Successfully</h3>
              <p style={{ fontSize: "0.85rem" }}>
                Your password has been updated. You can now log in with your new password.
              </p>
            </div>
            <Link to="/login" className="btn btn-full">
              Go to Login
            </Link>
          </div>
        ) : (
          <>
            {error && (
              <div className="state-container error-state" style={{ padding: "14px", marginBottom: "20px" }}>
                <p style={{ color: "#b91c1c", fontWeight: 600, fontSize: "0.9rem", marginBottom: "10px" }}>{error}</p>
                <Link to="/forgot-password" style={{ fontSize: "0.85rem", color: "var(--primary)", fontWeight: 600, textDecoration: "underline" }}>
                  Request a new reset link
                </Link>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="newPassword">New Password *</label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  className="form-control"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  disabled={loading}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm New Password *</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="form-control"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter new password"
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
                {loading ? "Resetting Password..." : "Reset Password"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordPage;
