import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Budget from './pages/Budget';
import Timeline from './pages/Timeline';
import { Vendors } from './pages/Vendors';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ResetPassword from './pages/ResetPassword';
import Profile from './pages/Profile';
import PrivateRoute from './components/auth/PrivateRoute';
import { Toast } from './components/shared/Toast';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Toast />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Layout>
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/budget" element={<Budget />} />
                    <Route path="/timeline" element={<Timeline />} />
                    <Route path="/vendors" element={<Vendors />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/" element={<Navigate replace to="/dashboard" />} />
                  </Routes>
                </Layout>
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;