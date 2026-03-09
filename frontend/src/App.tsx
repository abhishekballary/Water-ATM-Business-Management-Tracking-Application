import { Navigate, Route, Routes } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import CustomersPage from './pages/CustomersPage';
import RechargesPage from './pages/RechargesPage';
import ReportsPage from './pages/ReportsPage';
import CustomerAnalyticsPage from './pages/CustomerAnalyticsPage';
import PaymentAnalyticsPage from './pages/PaymentAnalyticsPage';

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
        <Route path="/monthly-reports" element={<ReportsPage />} />
        <Route path="/customer-analytics" element={<CustomerAnalyticsPage />} />
        <Route path="/payment-analytics" element={<PaymentAnalyticsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}
