import React, { useState, useEffect } from "react";
import AppointmentCard from "../components/AppointmentCard";

// TASK 2 & TASK 3: BookingPage integrated with Express REST API (POST /api/v1/appointments)
const BookingPage = () => {
  // Controlled form state using useState (Task 2)
  const [formData, setFormData] = useState({
    patientName: "",
    doctorName: "Dr. Rahul Mehta",
    date: "",
    timeSlot: "10:00 AM",
  });

  // State management for API flow
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [bookedAppointment, setBookedAppointment] = useState(null);
  const [recentAppointments, setRecentAppointments] = useState([]);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  // Fetch existing in-memory appointments on component mount (Task 3 GET /api/v1/appointments)
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(`${API_URL}/api/v1/appointments`);
        if (response.ok) {
          const result = await response.json();
          setRecentAppointments(result.data || []);
        }
      } catch (err) {
        console.error("Failed to fetch initial appointments:", err);
      }
    };
    fetchAppointments();
  }, [API_URL]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit handler making POST request to Express REST API
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.patientName || !formData.date) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const payload = {
        patientName: formData.patientName,
        doctorName: formData.doctorName,
        date: formData.date,
        timeSlot: formData.timeSlot,
        status: "pending",
        reason: "General Consultation",
      };

      // TASK 3: POST /api/v1/appointments
      const response = await fetch(`${API_URL}/api/v1/appointments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Unable to book the appointment. Please try again.");
      }

      const result = await response.json();
      const createdAppointment = result.data;

      // Store created appointment returned from API in React state
      setBookedAppointment(createdAppointment);

      // Append new appointment to recent list
      setRecentAppointments((prev) => [createdAppointment, ...prev]);

      // Reset form
      setFormData({
        patientName: "",
        doctorName: "Dr. Rahul Mehta",
        date: "",
        timeSlot: "10:00 AM",
      });
    } catch (err) {
      setError(err.message || "Unable to book the appointment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="booking-card">
        <div className="booking-header">
          <h1 className="booking-title">Book an appointment</h1>
          <p className="booking-subtitle">
            Enter your details and choose your preferred appointment time.
          </p>
        </div>

        {/* Task 2 Live Controlled State Display (For Viva Demonstration) */}
        {!bookedAppointment && (
          <div className="live-state-display">
            <span className="live-state-label">Live State Feedback (Task 2)</span>
            <span>Booking for: </span>
            <span className="live-state-value">
              {formData.patientName ? formData.patientName : "(Type patient name below)"}
            </span>
            {formData.doctorName && (
              <span style={{ color: "#64748b", marginLeft: "6px" }}>
                • {formData.doctorName}
              </span>
            )}
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="state-container error-state" style={{ padding: "16px", marginBottom: "20px" }}>
            <p style={{ color: "#b91c1c", fontWeight: 600 }}>{error}</p>
          </div>
        )}

        {/* SUCCESS CONFIRMATION SECTION */}
        {bookedAppointment ? (
          <div>
            <div className="alert-success" style={{ marginBottom: "20px" }}>
              <h3 style={{ fontSize: "1.1rem", marginBottom: "4px" }}>✓ Appointment Booked Successfully</h3>
              <p style={{ fontSize: "0.9rem" }}>
                Your appointment has been created and saved in the Express backend.
              </p>
            </div>

            <div style={{ marginBottom: "24px" }}>
              <h4 style={{ fontSize: "0.95rem", color: "var(--text-muted)", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Confirmed Appointment Card
              </h4>
              <AppointmentCard
                patientName={bookedAppointment.patientName}
                doctorName={bookedAppointment.doctorName}
                date={bookedAppointment.date}
                timeSlot={bookedAppointment.timeSlot}
                status={bookedAppointment.status}
              />
            </div>

            <button
              type="button"
              onClick={() => setBookedAppointment(null)}
              className="btn btn-secondary btn-full"
            >
              Book Another Appointment
            </button>
          </div>
        ) : (
          /* BOOKING FORM */
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="patientName">Patient Full Name *</label>
              <input
                type="text"
                id="patientName"
                name="patientName"
                className="form-control"
                value={formData.patientName}
                onChange={handleChange}
                placeholder="e.g. John Doe"
                disabled={loading}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="doctorName">Select Specialist Doctor *</label>
              <select
                id="doctorName"
                name="doctorName"
                className="form-control"
                value={formData.doctorName}
                onChange={handleChange}
                disabled={loading}
              >
                <option value="Dr. Rahul Mehta">Dr. Rahul Mehta (Cardiology)</option>
                <option value="Dr. Priya Shah">Dr. Priya Shah (Dermatology)</option>
                <option value="Dr. Amit Patel">Dr. Amit Patel (Orthopedics)</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="date">Preferred Date *</label>
              <input
                type="date"
                id="date"
                name="date"
                className="form-control"
                value={formData.date}
                onChange={handleChange}
                disabled={loading}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="timeSlot">Preferred Time Slot *</label>
              <select
                id="timeSlot"
                name="timeSlot"
                className="form-control"
                value={formData.timeSlot}
                onChange={handleChange}
                disabled={loading}
              >
                <option value="09:00 AM">09:00 AM</option>
                <option value="10:00 AM">10:00 AM</option>
                <option value="11:30 AM">11:30 AM</option>
                <option value="02:00 PM">02:00 PM</option>
                <option value="04:30 PM">04:30 PM</option>
              </select>
            </div>

            <button
              type="submit"
              className="btn btn-full"
              style={{ marginTop: "12px" }}
              disabled={loading}
            >
              {loading ? "Booking..." : "Book Appointment"}
            </button>
          </form>
        )}
      </div>

      {/* RECENT APPOINTMENTS SECTION (GET /api/v1/appointments) */}
      {recentAppointments.length > 0 && (
        <div style={{ marginTop: "40px" }}>
          <div className="section-header">
            <div>
              <h2 className="section-title">All System Appointments</h2>
              <p className="section-subtitle">
                Appointments loaded from Express backend (Task 3: <code>GET /api/v1/appointments</code>)
              </p>
            </div>
          </div>

          {recentAppointments.map((apt) => (
            <AppointmentCard
              key={apt.id || apt._id}
              patientName={apt.patientName}
              doctorName={apt.doctorName}
              date={apt.date}
              timeSlot={apt.timeSlot}
              status={apt.status}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingPage;
