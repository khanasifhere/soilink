// src/pages/UserDashboard.jsx
import React,{useEffect} from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const { user,isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
useEffect(() => {
    if (!isAuthenticated || user?.role !== 'user') {
      return (navigate('/'))
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="flex">
        {/* Sidebar only for user */}
        <aside className="w-64 bg-white shadow-md h-screen p-6 hidden md:block">
          <nav className="flex flex-col gap-4 text-green-800 font-medium">
            <Link to="/lands" className="hover:text-green-600">🌾 Browse Lands</Link>
            <Link to="/crops" className="hover:text-green-600">🌱 Browse Crops</Link>
            <Link to="/my-orders" className="hover:text-green-600">📦 My Orders</Link>
            <Link to="/my-rentals" className="hover:text-green-600">📄 My Rental Requests</Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <h2 className="text-3xl font-semibold text-green-800 mb-4">Welcome to User Dashboard</h2>
          <p>Use the sidebar to explore lands, crops, and manage your orders or rental requests.</p>
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;
