# MedCare Plus — Hospital Appointment System

**ITUE301 Advanced Web Development Frameworks Practical Examination**

* **Student Roll Number:** 24DCS023
* **Batch:** A
* **GitHub Repository Name:** `itue301-exam-24DCS023-A`
* **Local Workspace Folder:** `AWDF_CIE`

---

## Project Description

MedCare Plus is a modern, responsive Hospital Appointment System built for the ITUE301 Set A practical examination. It combines an **in-memory REST API flow (Task 3 & 4)** with a **Mongoose MongoDB database flow (Task 5)**, and a **JWT & Bcrypt Authentication System** (Signup, Login, Protected Booking, Password Reset, Auth-aware Navigation).

Key Features:
* **Task 1 & 2:** React components (`AppointmentCard`, `Navbar`), client-side routing (`HomePage`, `DoctorsPage`, `BookingPage`, `LoginPage`, `SignupPage`, `ForgotPasswordPage`, `ResetPasswordPage`), and state management with controlled inputs and dynamic state display.
* **Task 3:** Express REST API with in-memory arrays (`doctors`, `appointments`), custom `requestLogger` middleware (`[METHOD] [PATH] [TIMESTAMP]`), and global error handling middleware.
* **Task 4:** Frontend REST API consumption (`GET /api/v1/doctors`) using `fetch` and `useEffect` with triple-state handling (`data`, `loading`, `error`) and environment variable configuration (`VITE_API_URL`).
* **Task 5:** Separate MongoDB database integration with Mongoose schemas (`Patient`, `Doctor`, `Appointment`, `User`), database connection, demo operation endpoint (`/api/v1/mongodb-demo`), and structured Mongoose validation failure error handling (`/api/v1/mongodb-demo/validate-test`).
* **Authentication System:** Secure registration, JWT token authentication, Bcrypt password hashing, session restoration (`GET /api/v1/auth/me`), protected `/booking` route, password visibility toggle, password reset via token (`Nodemailer`), and responsive user account menu.

---

## Technology Stack

* **Frontend:** React 18, React Router DOM (v6), Vite, AuthContext
* **Backend:** Node.js, Express.js, JWT (`jsonwebtoken`), Bcrypt (`bcryptjs`), Nodemailer, CORS, Dotenv
* **Database:** MongoDB, Mongoose (v8)
* **Styling:** Vanilla CSS (Modern Health-Tech CSS Variables)

---

## Folder Structure

```
AWDF_CIE/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── AppointmentCard.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── DoctorsPage.jsx
│   │   │   ├── BookingPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── SignupPage.jsx
│   │   │   ├── ForgotPasswordPage.jsx
│   │   │   └── ResetPasswordPage.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   ├── vite.config.js
│   └── .env.example
│
├── backend/
│   ├── models/
│   │   ├── Patient.js
│   │   ├── Doctor.js
│   │   ├── Appointment.js
│   │   └── User.js
│   │
│   ├── routes/
│   │   └── authRoutes.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── utils/
│   │   └── sendEmail.js
│   │
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
├── .env.example
├── .gitignore
├── README.md
└── EXAM_CHECKLIST.md
```

---

## Prerequisites

1. **Node.js** (v18 or higher) & **npm**
2. **MongoDB Community Server** running locally on port `27017`
3. **MongoDB Compass** (for viewing `medcare_plus` database and `users`, `patients`, `doctors`, `appointments` collections)

---

## Environment Variables

### Backend (`backend/.env`)
Create a file named `backend/.env` (do NOT commit this file to Git):
```env
MONGO_URI=mongodb://localhost:27017/medcare_plus
PORT=5000
JWT_SECRET=medcare_plus_jwt_secret_key_24dcs023
JWT_EXPIRES_IN=1d
CLIENT_URL=http://localhost:5173

# Email Service Configuration (Nodemailer)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_app_password
```

### Frontend (`frontend/.env`)
Create a file named `frontend/.env` (do NOT commit this file to Git):
```env
VITE_API_URL=http://localhost:5000
```

*Note: Templates are available in `.env.example` in each directory.*

---

## Installation & Running Instructions

### 1. Backend Setup & Run

Open a terminal window and navigate to the backend directory:
```bash
cd backend
npm install
npm start
```
The Express server will start on **`http://localhost:5000`**.

### 2. Frontend Setup & Run

Open a second terminal window and navigate to the frontend directory:
```bash
cd frontend
npm install
npm run dev
```
The Vite React development server will start on **`http://localhost:5173`**.

---

## API Endpoints Summary

### Authentication APIs

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/v1/auth/signup` | Register new user account | No |
| `POST` | `/api/v1/auth/login` | User login (returns JWT token) | No |
| `GET` | `/api/v1/auth/me` | Get current user profile | Yes (Bearer JWT) |
| `POST` | `/api/v1/auth/logout` | Logout user | No |
| `POST` | `/api/v1/auth/forgot-password` | Request password reset token | No |
| `POST` | `/api/v1/auth/reset-password` | Reset password using token | No |

### Task 3 — Express In-Memory REST API

| Method | Endpoint | Description | Expected Status |
|---|---|---|---|
| `GET` | `/api/v1/doctors` | Get all doctors from in-memory array | `200 OK` |
| `GET` | `/api/v1/appointments` | Get all appointments from in-memory array | `200 OK` |
| `POST` | `/api/v1/appointments` | Add new appointment to in-memory array | `201 Created` |

### Task 5 — MongoDB / Mongoose Demo APIs

| Method | Endpoint | Description | Expected Status |
|---|---|---|---|
| `POST` | `/api/v1/mongodb-demo` | Create patient document in MongoDB (`medcare_plus`) | `201 Created` |
| `POST` | `/api/v1/mongodb-demo/validate-test` | Test Mongoose validation error handling | `400 Bad Request` |

---

## Complete Authentication Testing Flow

1. **Sign Up (`/signup`):**
   - Open `http://localhost:5173/signup`.
   - Register a user (`John Doe`, `john@example.com`, `password123`).
   - Observe automatic login and redirection to Home page with user name in Navbar (`Hi, John`).

2. **Protected Booking (`/booking`):**
   - Click **Book Appointment** while logged in. Access is granted.
   - Click Logout from user menu. Attempt to access `/booking` directly in URL.
   - Observe automatic redirect to `/login` with notice *"Please sign in to book an appointment."*

3. **Login (`/login`):**
   - Sign in with `john@example.com` / `password123`.
   - Test password visibility Show/Hide toggle button.

4. **Forgot Password (`/forgot-password`):**
   - Open `http://localhost:5173/forgot-password`.
   - Enter email `john@example.com`.
   - Observe generic security response *"If an account exists for this email, a password reset link has been sent."*

5. **Reset Password (`/reset-password/:token`):**
   - Open token link generated in server logs or email (e.g. `http://localhost:5173/reset-password/<token>`).
   - Enter new password (`newpassword123`).
   - Submit and observe success confirmation with link to Login.

---

## Email Configuration Notes

To enable real password reset emails via Nodemailer:
1. Set `EMAIL_HOST` (e.g. `smtp.gmail.com`), `EMAIL_PORT` (`587`), `EMAIL_USER` (your email address), and `EMAIL_PASS` (your Gmail App Password) inside `backend/.env`.
2. If SMTP environment variables are not configured, the application simulates the email and logs the password reset URL directly to the backend server console.

---

## GitHub Submission Steps

```bash
git add .
git commit -m "Add authentication system and UI polish"
git push -u origin main
git rev-parse HEAD
```
