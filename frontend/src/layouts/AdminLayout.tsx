import { NavLink, Outlet } from 'react-router-dom';

const links = [
  'Dashboard',
  'Customers',
  'Recharges',
  'Daily Reports',
  'Monthly Reports',
  'Customer Analytics',
  'Payment Analytics'
];

export default function AdminLayout() {
  return (
    <div className="min-h-screen md:flex">
      <aside className="w-full md:w-64 bg-slate-900 text-white p-4">
        <h1 className="text-xl font-bold mb-5">Water ATM Admin</h1>
        <nav className="space-y-2">
          {links.map((link) => (
            <NavLink
              key={link}
              to={`/${link.toLowerCase().replace(/\s+/g, '-')}`}
              className={({ isActive }) => `block rounded px-3 py-2 ${isActive ? 'bg-blue-500' : 'bg-slate-800'}`}
            >
              {link}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-4 md:p-6">
        <Outlet />
      </main>
    </div>
  );
}
