import { useState } from 'react';
import { LockKeyhole, Mail } from 'lucide-react';
import { api } from '../api';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const r = await api.post('/admin/login', { email, password });
      localStorage.setItem('ah_admin_token', r.data.token);
      localStorage.setItem('ah_admin_user', JSON.stringify(r.data.admin));
      onLogin();
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Check your email and password.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-5">
      <form onSubmit={submit} className="w-full max-w-md rounded-3xl border border-stone-200 bg-white p-8 shadow-xl">
        <div className="mb-8">
          <div className="text-2xl font-black">AH <span className="text-amber-800">WOODCRAFT</span></div>
          <p className="mt-2 text-sm text-stone-500">Admin sign in</p>
        </div>
        {error && <div className="mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</div>}
        <label className="text-sm font-bold">Email</label>
        <div className="mt-2 flex items-center gap-2 rounded-xl border border-stone-200 px-3">
          <Mail size={17} className="text-stone-400" />
          <input className="w-full py-3 outline-none" value={email} onChange={e => setEmail(e.target.value)} type="email" required />
        </div>
        <label className="mt-5 block text-sm font-bold">Password</label>
        <div className="mt-2 flex items-center gap-2 rounded-xl border border-stone-200 px-3">
          <LockKeyhole size={17} className="text-stone-400" />
          <input className="w-full py-3 outline-none" value={password} onChange={e => setPassword(e.target.value)} type="password" required />
        </div>
        <button disabled={busy} className="mt-6 w-full rounded-xl bg-stone-900 py-3.5 font-bold text-white disabled:opacity-50">
          {busy ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
    </div>
  );
}