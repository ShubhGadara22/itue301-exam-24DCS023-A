require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// Mongoose Models
const Patient = require("./models/Patient");
const Doctor = require("./models/Doctor");
const Appointment = require("./models/Appointment");

// Auth Routes
const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for React frontend (http://localhost:5173)
app.use(cors({ origin: "http://localhost:5173" }));

// Parse JSON request body
app.use(express.json());

// TASK 3: Request Logger Middleware
const requestLogger = (req, res, next) => {
  console.log(`[${req.method}] ${req.path} [${new Date().toISOString()}]`);
  next();
};
app.use(requestLogger);

// Mount Auth Routes
app.use("/api/v1/auth", authRoutes);

// -------------------------------------------------------------
// TASK 3: IN-MEMORY DATA & APIS (Separated from Task 5 MongoDB)
// -------------------------------------------------------------
const doctors = [
  {
    id: "d1",
    name: "Dr. Rahul Mehta",
    email: "rahul@medcare.com",
    specialisation: "Cardiology",
    available: true,
  },
  {
    id: "d2",
    name: "Dr. Priya Shah",
    email: "priya@medcare.com",
    specialisation: "Dermatology",
    available: false,
  },
  {
    id: "d3",
    name: "Dr. Amit Patel",
    email: "amit@medcare.com",
    specialisation: "Orthopedics",
    available: true,
  },
];

const appointments = [
  {
    id: "apt_1",
    patientName: "John Doe",
    doctorName: "Dr. Rahul Mehta",
    date: "2026-08-25",
    timeSlot: "10:00 AM",
    status: "confirmed",
    reason: "Regular consultation",
  },
  {
    id: "apt_2",
    patientName: "Jane Smith",
    doctorName: "Dr. Amit Patel",
    date: "2026-08-26",
    timeSlot: "02:30 PM",
    status: "pending",
    reason: "Joint pain checkup",
  },
];

// GET /api/v1/doctors - Returns in-memory doctors list
app.get("/api/v1/doctors", (req, res) => {
  res.status(200).json({
    success: true,
    data: doctors,
  });
});

// GET /api/v1/appointments - Returns in-memory appointments list
app.get("/api/v1/appointments", (req, res) => {
  res.status(200).json({
    success: true,
    data: appointments,
  });
});

// POST /api/v1/appointments - Adds appointment to in-memory array
app.post("/api/v1/appointments", (req, res) => {
  const { patientId, doctorId, patientName, doctorName, date, timeSlot, status, reason } = req.body;

  const newAppointment = {
    id: `apt_${Date.now()}`,
    patientId: patientId || "p1",
    doctorId: doctorId || "d1",
    patientName: patientName || "John Doe",
    doctorName: doctorName || "Dr. Rahul Mehta",
    date: date || new Date().toISOString().split("T")[0],
    timeSlot: timeSlot || "10:00 AM",
    status: status || "pending",
    reason: reason || "Consultation",
  };

  appointments.push(newAppointment);

  res.status(201).json({
    success: true,
    message: "Appointment created successfully",
    data: newAppointment,
  });
});

// -------------------------------------------------------------
// TASK 5: MONGODB & MONGOOSE DEMONSTRATION ENDPOINTS
// -------------------------------------------------------------

// MongoDB Connection
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/medcare_plus";
mongoose
  .connect(mongoURI)
  .then(() => console.log(`Connected to MongoDB database: medcare_plus at ${mongoURI}`))
  .catch((err) => console.log(`MongoDB connection status: ${err.message}`));

// MongoDB Operation Demo: Creates a valid Patient document using Mongoose
app.post("/api/v1/mongodb-demo", async (req, res, next) => {
  try {
    const { name, email, phone, bloodGroup, age } = req.body;
    
    // Create new patient document using Mongoose Patient model
    const patientData = {
      name: name || "Test Patient",
      email: email || `patient_${Date.now()}@example.com`,
      phone: phone || "9876543210",
      bloodGroup: bloodGroup || "O+",
      age: age || 25,
    };

    const patient = new Patient(patientData);
    const savedPatient = await patient.save();

    res.status(201).json({
      success: true,
      message: "Patient document created successfully in MongoDB (medcare_plus)",
      data: savedPatient,
    });
  } catch (err) {
    next(err);
  }
});

// MongoDB Validation Failure Demo Endpoint
app.post("/api/v1/mongodb-demo/validate-test", async (req, res, next) => {
  try {
    // Intentionally pass invalid bloodGroup ("XYZ") or missing name to trigger Mongoose validation error
    const { bloodGroup, email } = req.body;
    const invalidPatient = new Patient({
      name: req.body.name || "Invalid Patient Test",
      email: email || `invalid_${Date.now()}@example.com`,
      bloodGroup: bloodGroup || "XYZ", // Invalid blood group enum
    });

    await invalidPatient.save();
    res.status(200).json({ success: true, message: "Saved without errors" });
  } catch (err) {
    next(err);
  }
});

// -------------------------------------------------------------
// GLOBAL ERROR HANDLER MIDDLEWARE (Must be the last middleware)
// -------------------------------------------------------------
app.use((err, req, res, next) => {
  console.error(`[Error Handler] ${err.name}: ${err.message}`);

  // Handle Malformed JSON payload SyntaxError
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({
      success: false,
      message: "Invalid JSON payload",
    });
  }

  // Handle Mongoose Validation Errors specifically
  if (err.name === "ValidationError") {
    const errorMessages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errorMessages,
    });
  }

  // Handle Mongoose Duplicate Key Error (E11000)
  if (err.code === 11000) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: ["Email address must be unique"],
    });
  }

  // Unhandled internal server errors (Do not expose raw error stack)
  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
