'use client';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import type { AuthFormData, AuthResponse } from '@/types/auth';

export default function SignInPage() {
  const [formData, setFormData] = useState<AuthFormData>({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const redirect = useSearchParams().get('redirect');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const { data } = await axios.post<AuthResponse>('/api/auth/signin', formData);
      
      if (data.success && data.user) {
        router.push(redirect || data.user.role === 'admin' ? '/admin' : '/dashboard');
      } else {
        setError(data.message || 'Authentication failed');
      }
    } catch (err) {
      setError('An error occurred during sign in');
      console.error('SignIn error:', err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Sign In</h1>
      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => 
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Password</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => 
              setFormData({ ...formData, password: e.target.value })
            }
            className="w-full p-2 border rounded"
            required
            minLength={6}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}