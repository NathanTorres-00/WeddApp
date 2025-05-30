import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Budget from './pages/Budget';
import Timeline from './pages/Timeline';
import { Vendors } from './pages/Vendors';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/vendors" element={<Vendors />} />
          <Route path="/" element={<Navigate replace to="/dashboard" />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;