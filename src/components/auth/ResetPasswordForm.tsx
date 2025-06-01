import React, { useState } from 'react';
import { resetPassword } from '../../lib/auth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Mail, ArrowRight } from 'lucide-react';
import { LoadingSpinner } from '../shared/LoadingSpinner';

export function ResetPasswordForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await resetPassword(email);
      toast.success('Password reset instructions sent to your email');
      navigate('/login');
    } catch (error) {
      toast.error('Failed to send reset instructions');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <div className="mt-1 relative">
          <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Enter your email"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-xl shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
      >
        {loading ? (
          <LoadingSpinner size="sm\" color="#ffffff" />
        ) : (
          <>
            <ArrowRight className="w-5 h-5 mr-2" />
            Send Reset Instructions
          </>
        )}
      </button>
    </form>
  );
}