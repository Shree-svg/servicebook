# 🛠️ ServiceBook — Full-Stack Service Booking Platform

<div align="center">

![ServiceBook Banner](https://img.shields.io/badge/ServiceBook-MERN%20Platform-c084fc?style=for-the-badge&logo=react&logoColor=white)

[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com)
[![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev)

**A production-grade Urban Company-style marketplace built with the MERN stack.**  
Book home services, manage jobs as a provider, and oversee the platform as admin — all in one app.

[🚀 Live Demo](#) · [📖 Docs](#setup) · [🐛 Report Bug](https://github.com/Shree-svg/servicebook/issues)

</div>

---

## ✨ Features

### 👤 Customer
- Browse and search services by category
- **4-step booking flow** — Schedule → Address → Payment → Confirm
- Real-time booking tracking with status timeline
- Rate and review completed services
- Rewards dashboard and premium plans

### 🔧 Provider
- Job management dashboard (Accept / Start / Complete)
- Earnings wallet and transaction history
- Performance analytics and ratings overview
- Provider rewards program

### 🛡️ Admin
- Provider verification queue (Approve / Reject)
- Dispute resolution system
- Full platform oversight

---

## 🎨 Design System — Velvet Dusk

Custom dark theme built from Google Stitch prototypes.

| Token | Value | Usage |
|-------|-------|-------|
| Background | `#0d0d14` | App background |
| Surface | `#13131f` | Cards & panels |
| Primary | `#c084fc` | Buttons & accents |
| Secondary | `#f472b6` | Highlights |
| Tertiary | `#67e8f9` | Info & tags |
| Success | `#86efac` | Status badges |

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite + Tailwind CSS |
| Backend | Node.js + Express.js |
| Database | MongoDB + Mongoose |
| Auth | JWT + bcrypt + Role-based guards |
| Security | Helmet + CORS + Rate Limiting |
| UI | Custom Velvet Dusk design system (19 screens) |

---

## 📁 Project Structure

```
servicebook/
├── client/                 # React frontend
│   ├── src/
│   │   ├── api/            # Axios config + interceptors
│   │   ├── components/     # ProtectedRoute, AdminLayout
│   │   ├── context/        # AuthContext (JWT + session restore)
│   │   └── pages/
│   │       ├── booking/    # 4-step booking flow
│   │       ├── provider/   # Provider dashboard pages
│   │       └── admin/      # Admin panel pages
│   └── tailwind.config.js  # Velvet Dusk design tokens
│
└── server/                 # Express backend
    ├── controllers/        # Auth, Booking, Service, Admin
    ├── middleware/         # Auth guard, error handler, rate limiter
    ├── models/             # User, Service, Booking, Review
    ├── routes/             # REST API routes
    └── utils/              # JWT generator, ApiError
```

---

## ⚙️ Setup

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (free tier works)

### 1. Clone the repo
```bash
git clone https://github.com/Shree-svg/servicebook.git
cd servicebook
```

### 2. Backend setup
```bash
cd server
cp .env.example .env
```

Fill in `server/.env`:
```env
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_super_secret_key
PORT=5001
CLIENT_URL=http://localhost:5173
```

```bash
npm install
node seed.js      # Seeds DB with sample users + services
npm run dev       # Starts on port 5001
```

### 3. Frontend setup
```bash
cd ../client
```

Create `client/.env`:
```env
VITE_API_URL=http://localhost:5001/api
```

```bash
npm install
npm run dev       # Starts on port 5173
```

### 4. Test accounts (after seeding)

| Role | Email | Password |
|------|-------|----------|
| Customer | user@servicebook.com | User@123 |
| Provider | provider@servicebook.com | Provider@123 |
| Admin | admin@servicebook.com | Admin@123 |

---

## 🔐 Security

- Passwords hashed with **bcrypt** (10 salt rounds)
- Auth via **JWT** (30-day expiry)
- **Rate limiting** on all `/api/auth` routes
- **Helmet** security headers on all responses
- **CORS** restricted to frontend origin
- `.env` files excluded from version control

---

## 🗺️ API Endpoints

```
POST   /api/auth/register       Register new user
POST   /api/auth/login          Login + get JWT
GET    /api/auth/me             Get current user (protected)

GET    /api/services            List all services
GET    /api/services/:id        Get service by ID

POST   /api/bookings            Create booking (protected)
GET    /api/bookings/mybookings Get user's bookings (protected)
GET    /api/bookings/:id        Get booking by ID (protected)
PATCH  /api/bookings/:id/status Update booking status (protected)

GET    /api/admin/providers/pending  Pending verifications (admin)
PATCH  /api/admin/providers/:id/verify  Approve/reject provider (admin)
```

---

## 🚀 Deployment

| Service | Platform |
|---------|----------|
| Frontend | Vercel |
| Backend | Render |
| Database | MongoDB Atlas |

---

## 👨‍💻 Author

**Shree** — B.Tech @ VIT Chennai

[![GitHub](https://img.shields.io/badge/GitHub-Shree--svg-181717?style=flat&logo=github)](https://github.com/Shree-svg)

---

<div align="center">
  <sub>Built with ☕ and way too many terminal tabs.</sub>
</div>
