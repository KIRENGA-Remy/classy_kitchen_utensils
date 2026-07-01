import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { GoogleLogin } from '@react-oauth/google';
import AuthShell from './AuthShell';

const googleEnabled = Boolean(import.meta.env.VITE_GOOGLE_CLIENT_ID);

export default function AdminLogin() {
  const { login, googleLogin } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
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
    } finally { setLoading(false); }
  };

  const inputWrap = 'flex items-center gap-2 border border-gray-200 rounded-xl px-3 focus-within:ring-2 focus-within:ring-brand-accent/40';

  return (
    <AuthShell>
      <h1 className="text-3xl font-extrabold text-brand text-center">Welcome back!</h1>
      <p className="text-sm text-gray-500 text-center mt-1 mb-6">Sign in to the admin dashboard</p>

      {error && <p className="bg-red-50 text-red-600 text-sm rounded-lg px-3 py-2 mb-4">{error}</p>}

      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="text-sm font-medium">Email</label>
          <div className={inputWrap}>
            <Mail size={16} className="text-gray-400" />
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@classykitchen.rw" className="w-full py-2.5 outline-none bg-transparent" />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium">Password</label>
          <div className={inputWrap}>
            <Lock size={16} className="text-gray-400" />
            <input type={show ? 'text' : 'password'} required value={password} onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password" className="w-full py-2.5 outline-none bg-transparent" />
            <button type="button" onClick={() => setShow((s) => !s)} className="text-gray-400">
              {show ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <button disabled={loading}
          className="w-full bg-brand-accent text-white font-bold rounded-xl py-3 disabled:opacity-60 hover:bg-amber-600 transition">
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>

      {googleEnabled && (
        <>
          <div className="flex items-center gap-3 my-5">
            <span className="h-px bg-gray-200 flex-1" />
            <span className="text-xs text-gray-400">or</span>
            <span className="h-px bg-gray-200 flex-1" />
          </div>
          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={async (cr) => {
                setError('');
                if (!cr.credential) { setError('Google sign-in failed'); return; }
                try {
                  await googleLogin(cr.credential);
                  navigate('/admin');
                } catch (err: any) {
                  setError(err.response?.data?.error ?? 'Google sign-in failed');
                }
              }}
              onError={() => setError('Google sign-in failed')}
            />
          </div>
        </>
      )}

      <p className="text-center text-sm text-gray-500 mt-6">
        Don’t have an account? <Link to="/admin/signup" className="text-brand-accent font-semibold underline">Sign up</Link>
      </p>
    </AuthShell>
  );
}
