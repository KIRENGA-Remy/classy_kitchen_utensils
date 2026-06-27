import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function AdminLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      await login(email, password);
      navigate('/admin');
    } catch (err: any) {
      setError(err.response?.data?.error ?? 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form onSubmit={submit} className="bg-white rounded-2xl shadow p-8 w-full max-w-sm">
        <h1 className="text-xl font-extrabold text-brand mb-1">Admin sign in</h1>
        <p className="text-sm text-gray-500 mb-6">Classy Kitchen Utensils</p>
        {error && <p className="bg-red-50 text-red-600 text-sm rounded-lg px-3 py-2 mb-4">{error}</p>}
        <label className="block text-sm font-medium mb-1">Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required
          className="w-full border border-gray-200 rounded-lg px-3 py-2 mb-4" />
        <label className="block text-sm font-medium mb-1">Password</label>
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required
          className="w-full border border-gray-200 rounded-lg px-3 py-2 mb-6" />
        <button disabled={loading}
          className="w-full bg-brand-accent text-white font-bold rounded-lg py-2.5 disabled:opacity-60">
          {loading ? '…' : 'Sign in'}
        </button>
      </form>
    </div>
  );
}
