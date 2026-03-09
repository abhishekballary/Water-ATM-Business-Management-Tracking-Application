import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/services';

export default function LoginPage() {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { data } = await login({ username, password });
    localStorage.setItem('token', data.token);
    navigate('/dashboard');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <form className="w-full max-w-sm rounded bg-white p-5 shadow" onSubmit={handleSubmit}>
        <h2 className="mb-4 text-xl font-semibold">Admin Login</h2>
        <input className="mb-3 w-full rounded border p-2" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input
          type="password"
          className="mb-3 w-full rounded border p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full rounded bg-blue-600 p-2 text-white">Login</button>
      </form>
    </div>
  );
}
