# Water ATM Business Management & Tracking Application

Full-stack app for managing village water ATM operations with support for coin, QR/UPI, and RFID smart-card-based workflows.

## Monorepo Structure

- `backend/` Express + MongoDB REST API
- `frontend/` React + TypeScript + Tailwind admin dashboard

## Backend Features

- JWT admin authentication (`POST /auth/login`)
- Customer smart card management (CRUD)
- Recharge transaction tracking and filtering
- Daily report creation/history/monthly aggregate endpoint
- Dashboard summary + analytics endpoints
- Multi-machine-ready schema (`machineId` in transactions)
- Seed script to create admin + sample data

### Backend API

- Auth
  - `POST /auth/login`
- Customers
  - `POST /customers`
  - `GET /customers`
  - `GET /customers/:id`
  - `PUT /customers/:id`
  - `DELETE /customers/:id`
- Recharges
  - `POST /recharges`
  - `GET /recharges`
  - `GET /recharges/customer/:cardNumber`
- Daily Reports
  - `POST /reports`
  - `GET /reports`
  - `PUT /reports/:id`
  - `GET /reports/monthly`
- Dashboard
  - `GET /dashboard/summary`
  - `GET /dashboard/analytics`

## Frontend Features

- Admin login page
- Responsive admin layout with sidebar navigation
- Dashboard with KPI cards + Recharts visualizations
- Customers table (search + sorting + pagination)
- Recharges table (sorting + pagination)
- Daily/Monthly report page
- Customer analytics page (regular/inactive segment overview)
- Payment analytics page

## Setup

### 1) Backend

```bash
cd backend
npm install
cp .env.example .env
npm run seed
npm run dev
```

Seeded admin credentials:
- username: `admin`
- password: `admin123`

### 2) Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend expects backend at `http://localhost:5000` by default.
Set `VITE_API_URL` in frontend env if needed.

## Future-ready notes

- `machineId` is present in core business models to support scaling from one to multiple water ATMs.
- Customer model includes engagement fields (`lastRechargeDate`, `rechargeCount`, `customerSegment`) for future SMS reminders/promotions.
- Separate analytics/reporting endpoints support future IoT auto-sync from machines.
