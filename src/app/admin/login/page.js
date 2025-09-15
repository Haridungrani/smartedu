// app/admin/login/page.js
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      router.push('/admin/'); // Redirect to dashboard after login
    } else {
      setError(data.error || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
        
        {error && <p className="text-red-500 mb-4">{error}</p>}
        
        <div className="mb-4">
          <label>Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
            className="w-full border p-2 rounded"/>
        </div>

        <div className="mb-4">
          <label>Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
            className="w-full border p-2 rounded"/>
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Login
        </button>
      </form>
    </div>
  );
}
