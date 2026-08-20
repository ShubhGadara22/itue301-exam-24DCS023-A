import React, { useState, useEffect, useCallback } from "react";

// TASK 4: DoctorsPage consuming Express REST API dynamically
const DoctorsPage = () => {
  // THREE required states for Task 4
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  // Asynchronous API fetch function
  const fetchDoctors = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const response = await fetch(`${API_URL}/api/v1/doctors`);

      if (!response.ok) {
        throw new Error("Unable to load doctors. Please make sure the backend server is running.");
      }

      const result = await response.json();
      setData(result.data || []);
    } catch (err) {
      setError(err.message || "Unable to load doctors.");
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  // Helper function to generate avatar initials (e.g., "Rahul Mehta" -> "RM")
  const getInitials = (name) => {
    if (!name) return "DR";
    const cleanName = name.replace(/^Dr\.\s*/i, "").trim();
    const parts = cleanName.split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return cleanName.substring(0, 2).toUpperCase();
  };

  return (
    <div className="container">
      <div className="section-header">
        <div>
          <h1 className="section-title">Specialist Doctors</h1>
          <p className="section-subtitle">
            View available medical specialists and check their real-time consultation status.
          </p>
        </div>
      </div>

      {/* 1. LOADING SKELETON STATE (Controlled by loading state) */}
      {loading && (
        <div className="doctors-grid">
          {[1, 2, 3].map((n) => (
            <div key={n} className="skeleton-card">
              <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
                <div className="skeleton-avatar"></div>
                <div style={{ flex: 1 }}>
                  <div className="skeleton-text long"></div>
                  <div className="skeleton-text short"></div>
                </div>
              </div>
              <div className="skeleton-text short" style={{ marginTop: "16px" }}></div>
            </div>
          ))}
        </div>
      )}

      {/* 2. ERROR STATE WITH RETRY BUTTON */}
      {error && !loading && (
        <div className="state-container error-state">
          <h3 className="state-title" style={{ color: "var(--status-cancelled-text)" }}>
            Unable to load doctors
          </h3>
          <p className="state-desc">{error}</p>
          <button onClick={fetchDoctors} className="btn">
            Retry Connection
          </button>
        </div>
      )}

      {/* 3. EMPTY STATE */}
      {!loading && !error && data.length === 0 && (
        <div className="state-container">
          <h3 className="state-title">No doctors available right now</h3>
          <p className="state-desc">Please check back later or contact hospital administration.</p>
        </div>
      )}

      {/* 4. SUCCESS STATE - Dynamic render from Express API */}
      {!loading && !error && data.length > 0 && (
        <div className="doctors-grid">
          {data.map((doctor) => (
            <div key={doctor.id || doctor._id} className="doctor-card">
              <div>
                <div className="doctor-card-header">
                  <div className="doctor-avatar">
                    {getInitials(doctor.name)}
                  </div>
                  <div className="doctor-details">
                    <h3>{doctor.name}</h3>
                    <span className="specialisation-pill">{doctor.specialisation}</span>
                  </div>
                </div>

                {doctor.email && (
                  <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "12px" }}>
                    <strong>Email:</strong> {doctor.email}
                  </p>
                )}
              </div>

              <div className="doctor-card-body">
                <span className="meta-label">Consultation Status</span>
                <span className={`availability-status ${doctor.available ? "avail-true" : "avail-false"}`}>
                  <span className="status-dot"></span>
                  {doctor.available ? "Available" : "Unavailable"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorsPage;
