import React from "react";

// TASK 1: AppointmentCard Component accepting 5 required props
const AppointmentCard = ({ patientName, doctorName, date, timeSlot, status }) => {
  const normalizedStatus = status ? status.toLowerCase() : "pending";
  const cardStatusClass = `appointment-card status-${normalizedStatus}-card`;
  const badgeStatusClass = `status-badge status-${normalizedStatus}`;

  return (
    <div className={cardStatusClass}>
      <div className="appointment-main-info">
        <span className="patient-name-title">{patientName}</span>
        <span className="doctor-subtitle">With {doctorName}</span>
      </div>

      <div className="appointment-meta-group">
        <div className="meta-item">
          <span className="meta-label">Date</span>
          <span className="meta-value">{date}</span>
        </div>

        <div className="meta-item">
          <span className="meta-label">Time Slot</span>
          <span className="meta-value">{timeSlot}</span>
        </div>

        <div className="meta-item">
          <span className="meta-label">Status</span>
          <span className={badgeStatusClass}>{status}</span>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
