'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import type { AuthFormData, AuthResponse } from '@/types/auth';

export default function SignUpPage() {
  const [formData, setFormData] = useState<AuthFormData>({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const { data } = await axios.post<AuthResponse>('/api/auth/signup', formData);
      
      if (data.success) {
        setSuccess(true);
        setTimeout(() => router.push('/signin'), 2000);
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('An error occurred during registration');
      console.error('SignUp error:', err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Sign Up</h1>
      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">
          Registration successful! Redirecting to sign in...
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
          <label className="block mb-1">Password (min 6 characters)</label>
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
          Create Account
        </button>
      </form>
    </div>
  );
}