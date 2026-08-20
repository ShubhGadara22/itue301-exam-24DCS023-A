# ITUE301 Advanced Web Development Frameworks — Exam Checklist

**Student Roll Number:** 24DCS023  
**Batch:** A  
**Repository:** itue301-exam-24DCS023-A  
**Project:** MedCare Plus — Hospital Appointment System  

---

## TASK 1 — 4 MARKS: React Component Architecture
- [x] HomePage
- [x] DoctorsPage
- [x] BookingPage
- [x] AppointmentCard
- [x] components folder (`frontend/src/components/`)
- [x] AppointmentCard accepts `patientName`
- [x] AppointmentCard accepts `doctorName`
- [x] AppointmentCard accepts `date`
- [x] AppointmentCard accepts `timeSlot`
- [x] AppointmentCard accepts `status`
- [x] All five props displayed
- [x] `confirmed` styling (`status-confirmed`)
- [x] `pending` styling (`status-pending`)
- [x] `cancelled` styling (`status-cancelled`)
- [x] Parent passes appointment data through props

---

## TASK 2 — 4 MARKS: React Routing + State Management
- [x] React Router installed (`react-router-dom`)
- [x] `/` → HomePage
- [x] `/doctors` → DoctorsPage
- [x] `/booking` → BookingPage
- [x] Navbar (`Navbar.jsx`)
- [x] React Router Links (`<Link>`)
- [x] No full page reload
- [x] Booking form
- [x] Patient name input
- [x] Doctor name select
- [x] Date picker
- [x] Time slot select
- [x] `useState` hook used
- [x] At least two meaningful state values (`formData`, `bookingStatus`)
- [x] Dynamic state value displayed (`Current patient: ...`)

---

## TASK 3 — 4 MARKS: Express REST API + Middleware
- [x] Express server (`backend/server.js`)
- [x] `GET /api/v1/appointments`
- [x] `POST /api/v1/appointments`
- [x] `GET /api/v1/doctors`
- [x] In-memory appointments array
- [x] In-memory doctors array
- [x] `requestLogger` middleware
- [x] `requestLogger` applied globally (`app.use(requestLogger)`)
- [x] Correct METHOD logged (`req.method`)
- [x] Correct PATH logged (`req.path`)
- [x] ISO timestamp logged (`new Date().toISOString()`)
- [x] Global error middleware (last middleware with `(err, req, res, next)`)
- [x] Error middleware is last
- [x] Structured error JSON returned (`{ "success": false, "message": "..." }`)
- [x] GET returns 200
- [x] POST returns 201
- [x] Server error returns 500
- [x] API tested with Postman/Thunder Client / cURL

---

## TASK 4 — 4 MARKS: REST API Consumption in React
- [x] DoctorsPage uses Express API (`GET http://localhost:5000/api/v1/doctors`)
- [x] `fetch` API used
- [x] `useEffect` hook used
- [x] `data` state
- [x] `loading` state
- [x] `error` state
- [x] Loading message displayed ("Loading doctors...")
- [x] Error message displayed ("Failed to load doctors.")
- [x] Successful doctor display
- [x] Doctor name displayed
- [x] Specialisation displayed
- [x] Availability displayed
- [x] Data comes from API
- [x] No hardcoded doctors in DoctorsPage
- [x] Asynchronous pattern used (`async/await`)

---

## TASK 5 — 4 MARKS: MongoDB + Mongoose
- [x] MongoDB connection (`mongoose.connect`)
- [x] Mongoose package used
- [x] `medcare_plus` database
- [x] Patient schema (`backend/models/Patient.js`)
- [x] Patient name required
- [x] Patient email required
- [x] Patient email unique
- [x] Patient phone field
- [x] Blood group enum
- [x] All eight blood groups included (A+, A-, B+, B-, AB+, AB-, O+, O-)
- [x] Patient age field
- [x] Doctor schema (`backend/models/Doctor.js`)
- [x] Doctor name required
- [x] Doctor email field
- [x] Doctor specialisation required
- [x] Doctor available default true
- [x] Appointment schema (`backend/models/Appointment.js`)
- [x] `patientId` reference (`ref: "Patient"`)
- [x] `doctorId` reference (`ref: "Doctor"`)
- [x] `date` required
- [x] `timeSlot` required
- [x] `status` enum (pending, confirmed, cancelled)
- [x] `pending` default status
- [x] `reason` maxlength 300
- [x] `.env` file for `MONGO_URI`
- [x] `MONGO_URI` configured (`mongodb://localhost:27017/medcare_plus`)
- [x] MongoDB operation endpoint (`POST /api/v1/mongodb-demo`)
- [x] Validation failure endpoint (`POST /api/v1/mongodb-demo/validate-test`)
- [x] Meaningful validation error returned (`{ "success": false, "message": "Validation failed", "errors": [...] }`)
- [x] Raw Mongoose error stack not exposed

---

## SUBMISSION & SETUP
- [x] Required GitHub repository name (`itue301-exam-24DCS023-A`)
- [x] `frontend/` directory structure complete
- [x] `frontend/src/` components and pages
- [x] `frontend/package.json` with scripts and dependencies
- [x] `backend/` directory structure complete
- [x] `backend/models/` schemas
- [x] `backend/server.js` server implementation
- [x] `backend/package.json` with `npm start` script
- [x] `.env.example` templates created
- [x] `.gitignore` created ignoring `.env` and `node_modules`
- [x] `README.md` documentation created

---

## REPORT / EVIDENCE REQUIREMENTS
- [x] Screenshot 1 instructions provided (React application in browser)
- [x] Screenshot 2 instructions provided (REST API in Postman / cURL)
- [x] Screenshot 3 instructions provided (MongoDB Compass showing database)
- [x] PDF filename instructions (`24DCS023_SetA_Report.pdf`)
