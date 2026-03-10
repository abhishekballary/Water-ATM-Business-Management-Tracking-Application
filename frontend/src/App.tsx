import { Navigate, Route, Routes } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import CustomersPage from './pages/CustomersPage';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import MonthlyReportPage from './pages/MonthlyReportPage';
import RechargesPage from './pages/RechargesPage';
import ReportsPage from './pages/ReportsPage';

const Private = ({ children }: { children: JSX.Element }) =>
  localStorage.getItem('token') ? children : <Navigate to="/login" replace />;

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        element={
          <Private>
            <AdminLayout />
          </Private>
        }
      >
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/customers" element={<CustomersPage />} />
        <Route path="/recharges" element={<RechargesPage />} />
        <Route path="/daily-reports" element={<ReportsPage />} />
        <Route path="/monthly-reports" element={<MonthlyReportPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}
