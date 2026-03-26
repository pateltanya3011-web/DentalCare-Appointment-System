# 🦷 DentalCare – Dentist Booking App

A MERN stack dentist appointment booking system with RBAC (Role-Based Access Control).

## 🔧 Tech Stack
- **Frontend:** React + Vite
- **Backend:** Node.js + Express
- **Database:** MongoDB (Mongoose)
- **Auth:** JWT (JSON Web Token)

---

## 📁 Folder Structure
```
dentist-app/
├── backend/
│   ├── models/         # Mongoose schemas
│   ├── routes/         # Express routes
│   ├── middleware/     # JWT auth middleware
│   ├── .env            # Environment variables
│   └── server.js       # Entry point
└── frontend/
    ├── src/
    │   ├── pages/      # All page components
    │   ├── components/ # Shared components (Navbar)
    │   ├── context/    # AuthContext
    │   └── api.js      # Axios instance
    └── vite.config.js
```

---

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v18+)
- MongoDB running locally on port 27017

### 1. Backend Setup
```bash
cd backend
npm install
# Edit .env if needed
npm run dev
```
Backend runs on: http://localhost:5000

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on: http://localhost:5173

---

## 🔐 RBAC System

| Role    | Can Register | Can Login | Access              |
|---------|-------------|-----------|---------------------|
| Admin   | ❌ No        | ✅ Yes     | Admin Panel         |
| Patient | ✅ Yes       | ✅ Yes     | Patient Dashboard   |


---

## ✨ Features

### Patient Panel
- Register & Login
- View all dental services with pricing
- Book an appointment (service, date, time)
- View & cancel own appointments

### Admin Panel
- View dashboard stats (total patients, appointments by status)
- View all appointments with filter (pending/confirmed/cancelled)
- Confirm or cancel any appointment
- View all registered patients

---

## 📌 API Endpoints

| Method | Route                          | Access  | Description              |
|--------|-------------------------------|---------|--------------------------|
| POST   | /api/auth/register             | Public  | Patient registration     |
| POST   | /api/auth/login                | Public  | Login (admin + patient)  |
| POST   | /api/appointments              | Patient | Book appointment         |
| GET    | /api/appointments/my           | Patient | My appointments          |
| PATCH  | /api/appointments/:id/cancel   | Patient | Cancel appointment       |
| GET    | /api/admin/stats               | Admin   | Dashboard stats          |
| GET    | /api/admin/appointments        | Admin   | All appointments         |
| PATCH  | /api/admin/appointments/:id    | Admin   | Update status            |
| GET    | /api/admin/patients            | Admin   | All patients             |
