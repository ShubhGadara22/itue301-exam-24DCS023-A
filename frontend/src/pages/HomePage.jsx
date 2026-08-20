import React from "react";
import { Link } from "react-router-dom";
import AppointmentCard from "../components/AppointmentCard";

// TASK 1 & TASK 2: HomePage Component
const HomePage = () => {
  // Sample appointment data to demonstrate AppointmentCard props and status styles
  const sampleAppointments = [
    {
      id: 1,
      patientName: "John Doe",
      doctorName: "Dr. Rahul Mehta",
      date: "2026-08-25",
      timeSlot: "10:00 AM",
      status: "confirmed",
    },
    {
      id: 2,
      patientName: "Jane Smith",
      doctorName: "Dr. Priya Shah",
      date: "2026-08-26",
      timeSlot: "11:30 AM",
      status: "pending",
    },
    {
      id: 3,
      patientName: "Robert Johnson",
      doctorName: "Dr. Amit Patel",
      date: "2026-08-27",
      timeSlot: "03:00 PM",
      status: "cancelled",
    },
  ];

  return (
    <div className="container">
      {/* Modern Healthcare Hero Section */}
      <section className="hero-section">
        {/* Subtle Background SVG Wave Graphic */}
        <svg
          className="hero-bg-graphic"
          width="320"
          height="320"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="100" cy="100" r="80" stroke="#5B3A6D" strokeWidth="12" />
          <path
            d="M40 100C70 60 130 140 160 100"
            stroke="#E58B73"
            strokeWidth="8"
            strokeLinecap="round"
          />
        </svg>

        <span className="hero-tag">
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#E58B73" }}></span>
          MedCare Plus Technology
        </span>

        <h1 className="hero-title">
          Healthcare that fits your schedule.
        </h1>

        <p className="hero-subtitle">
          Find specialized medical professionals, check real-time consultation availability, and book appointments seamlessly.
        </p>

        <div className="hero-actions">
          <Link to="/booking" className="btn">
            Book an Appointment
          </Link>
          <Link to="/doctors" className="btn btn-secondary">
            Explore Doctors
          </Link>
        </div>
      </section>

      {/* Feature Steps Section */}
      <section className="features-grid">
        <div className="feature-card">
          <div className="feature-number">01</div>
          <h3>Find Specialists</h3>
          <p>Browse experienced doctors by medical discipline and view instant availability status.</p>
        </div>
        <div className="feature-card">
          <div className="feature-number">02</div>
          <h3>Select Time</h3>
          <p>Choose an optimal date and time slot that fits seamlessly into your daily schedule.</p>
        </div>
        <div className="feature-card">
          <div className="feature-number">03</div>
          <h3>Instant Booking</h3>
          <p>Confirm appointment details securely with live controlled form verification.</p>
        </div>
      </section>

      {/* Task 1 Component Demonstration */}
      <section style={{ marginTop: "36px" }}>
        <div className="section-header">
          <div>
            <h2 className="section-title">Sample Appointments</h2>
            <p className="section-subtitle">
              Demonstrating reusable <code>AppointmentCard</code> component with props and dynamic status badge styling.
            </p>
          </div>
        </div>

        {sampleAppointments.map((apt) => (
          <AppointmentCard
            key={apt.id}
            patientName={apt.patientName}
            doctorName={apt.doctorName}
            date={apt.date}
            timeSlot={apt.timeSlot}
            status={apt.status}
          />
        ))}
      </section>
    </div>
  );
};

export default HomePage;
