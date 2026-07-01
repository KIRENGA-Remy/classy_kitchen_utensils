import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, KeyRound } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../../context/AuthContext';
import AuthShell from './AuthShell';

const googleEnabled = Boolean(import.meta.env.VITE_GOOGLE_CLIENT_ID);

export default function AdminSignup() {
  const { register, googleLogin } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', name: '', password: '', confirm: '', inviteCode: '' });
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirm) return setError('Passwords do not match');
    setLoading(true);
    try {
      await register({ email: form.email, name: form.name, password: form.password, inviteCode: form.inviteCode || undefined });
      navigate('/admin');
    } catch (err: any) {
      setError(err.response?.data?.error ?? 'Sign-up failed');
    } finally { setLoading(false); }
  };

  const wrap = 'flex items-center gap-2 border border-gray-200 rounded-xl px-3 focus-within:ring-2 focus-within:ring-brand-accent/40';

  return (
    <AuthShell>
      <h1 className="text-3xl font-extrabold text-brand text-center">Create admin account</h1>
      <p className="text-sm text-gray-500 text-center mt-1 mb-6">Classy Kitchen Utensils</p>

      {error && <p className="bg-red-50 text-red-600 text-sm rounded-lg px-3 py-2 mb-4">{error}</p>}

      <form onSubmit={submit} className="space-y-4">
        <div><label className="text-sm font-medium">Email</label>
          <div className={wrap}><Mail size={16} className="text-gray-400" />
            <input type="email" required value={form.email} onChange={(e) => set('email', e.target.value)}
              placeholder="you@classykitchen.rw" className="w-full py-2.5 outline-none bg-transparent" /></div></div>

        <div><label className="text-sm font-medium">Full name</label>
          <div className={wrap}><User size={16} className="text-gray-400" />
            <input required value={form.name} onChange={(e) => set('name', e.target.value)}
              placeholder="Your name" className="w-full py-2.5 outline-none bg-transparent" /></div></div>

        <div><label className="text-sm font-medium">Password</label>
          <div className={wrap}><Lock size={16} className="text-gray-400" />
            <input type={show ? 'text' : 'password'} required value={form.password} onChange={(e) => set('password', e.target.value)}
              placeholder="At least 8 characters" className="w-full py-2.5 outline-none bg-transparent" />
            <button type="button" onClick={() => setShow((s) => !s)} className="text-gray-400">{show ? <EyeOff size={16} /> : <Eye size={16} />}</button></div></div>

        <div><label className="text-sm font-medium">Confirm password</label>
          <div className={wrap}><Lock size={16} className="text-gray-400" />
            <input type={show ? 'text' : 'password'} required value={form.confirm} onChange={(e) => set('confirm', e.target.value)}
              placeholder="Re-enter password" className="w-full py-2.5 outline-none bg-transparent" /></div></div>

        <div><label className="text-sm font-medium">Invite code <span className="text-gray-400 font-normal">(required after the first admin)</span></label>
          <div className={wrap}><KeyRound size={16} className="text-gray-400" />
            <input value={form.inviteCode} onChange={(e) => set('inviteCode', e.target.value)}
              placeholder="Provided by an existing admin" className="w-full py-2.5 outline-none bg-transparent" /></div></div>

        <button disabled={loading} className="w-full bg-brand-accent text-white font-bold rounded-xl py-3 disabled:opacity-60 hover:bg-amber-600 transition">
          {loading ? 'Creating…' : 'Sign up'}
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
                  await googleLogin(cr.credential, form.inviteCode || undefined);
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
        Already have an account? <Link to="/admin/login" className="text-brand-accent font-semibold underline">Sign in</Link>
      </p>
    </AuthShell>
  );
}

