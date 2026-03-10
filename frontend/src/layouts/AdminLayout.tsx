import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const links = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Customers', to: '/customers' },
  { label: 'Recharges', to: '/recharges' },
  { label: 'Daily Reports', to: '/daily-reports' },
  { label: 'Monthly Reports', to: '/monthly-reports' }
];

export default function AdminLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen md:flex">
      <aside className="w-full bg-slate-900 p-4 text-white md:w-64">
        <h1 className="mb-5 text-xl font-bold">Water ATM Admin</h1>
        <nav className="space-y-2">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={({ isActive }) => `block rounded px-3 py-2 ${isActive ? 'bg-blue-500' : 'bg-slate-800'}`}>
              {link.label}
            </NavLink>
          ))}
        </nav>
        <button
          className="mt-4 w-full rounded bg-red-600 py-2"
          onClick={() => {
            logout();
            navigate('/login');
          }}
        >
          Logout
        </button>
      </aside>
      <main className="flex-1 bg-slate-100 p-4 md:p-6">
        <Outlet />
      </main>
    </div>
  );
}
