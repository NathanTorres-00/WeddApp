import React from 'react';
import { ResetPasswordForm } from '../components/auth/ResetPasswordForm';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

export default function ResetPassword() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-accent-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white/70 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-white/20">
        <div className="text-center">
          <div className="flex items-center justify-center">
            <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
              <Heart className="h-6 w-6 text-primary-600" />
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Reset your password</h2>
          <p className="mt-2 text-sm text-gray-600">
            Remember your password?{' '}
            <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
              Sign in
            </Link>
          </p>
        </div>

        <ResetPasswordForm />
      </div>
    </div>
  );
}