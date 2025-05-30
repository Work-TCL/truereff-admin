import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import { Dashboard } from './components/dashboard/Dashboard';
import Login from './components/auth/Login';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { PublicRoute } from './routes/PublicRoute';
import CategoryManagement from './components/dashboard/Category';
import Settings from './components/dashboard/Settings';
import { AppLayout } from './components/layouts/AppLayout';
import Creators from './components/dashboard/Creator';
import Vendors from './components/dashboard/Vendors';
import CreatorDetails from './components/dashboard/CreatorDetails';
import VendorDetails from './components/dashboard/VendorDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<PublicRoute>
          <Login />
        </PublicRoute>} />
        <Route path="/" element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Dashboard />} />
          {/* Add more nested routes here */}
          <Route path="categories" element={<CategoryManagement />} />
          <Route path="settings" element={<Settings />} />
          <Route path="creators" element={<Creators />} />
          <Route path="creators/:creatorId" element={<CreatorDetails />} />
          <Route path="vendors" element={<Vendors />} />
          <Route path="vendors/:vendorId" element={<VendorDetails />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
