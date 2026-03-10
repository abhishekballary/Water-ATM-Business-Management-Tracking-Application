# Water ATM Business Tracking System

Complete full-stack application to manage a village water vending machine business with dynamic dashboards backed by MongoDB data.

## Tech Stack

- **Frontend:** React, TypeScript, Vite, TailwindCSS, Axios, Recharts, React Router
- **Backend:** Node.js, Express.js, REST APIs
- **Database:** MongoDB + Mongoose
- **Auth:** JWT admin login + bcrypt password hashing

## Project Structure

```txt
water-atm-system/
  backend/
    src/
      config/
      controllers/
      middleware/
      models/
      routes/
      server.js
  frontend/
    src/
      components/
      hooks/
      layouts/
      pages/
      services/
```

## Core Features

- Admin login with JWT
- Customer smart-card management (add/edit/delete/search)
- Recharge transactions with customer/date filtering
- Daily reports with create + edit + history
- Monthly report aggregates
- Dynamic dashboard cards and charts from DB (no hardcoded stats)
- Payment type tracking: coin(cash), QR, card
- 20L jar usage tracking

## Backend API Endpoints

All endpoints are prefixed with `/api`.

- **Auth**
  - `POST /api/auth/login`
- **Customers**
  - `POST /api/customers`
  - `GET /api/customers`
  - `GET /api/customers/:id`
  - `PUT /api/customers/:id`
  - `DELETE /api/customers/:id`
- **Recharges**
  - `POST /api/recharges`
  - `GET /api/recharges`
  - `GET /api/recharges/customer/:cardNumber`
- **Daily Reports**
  - `POST /api/reports`
  - `GET /api/reports`
  - `PUT /api/reports/:id`
  - `GET /api/reports/monthly?year=YYYY&month=MM`
- **Dashboard Analytics**
  - `GET /api/dashboard/summary`
  - `GET /api/dashboard/analytics`

## Setup Instructions

### 1) Backend

```bash
cd backend
npm install
cp .env.example .env
npm run seed
npm run dev
```

Default seeded admin:
- username: `admin`
- password: `admin123`

### 2) Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend environment variable (optional):

```bash
VITE_API_URL=http://localhost:5000/api
```

## Data Flow

1. User submits forms (customers, recharges, reports).
2. Frontend sends payload via Axios service layer.
3. Express APIs store data in MongoDB.
4. Dashboard endpoints aggregate current DB data.
5. UI auto-refreshes via React Query invalidation + refetch.
