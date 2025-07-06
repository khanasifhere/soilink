import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';

const FarmerDashboard = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'farmer') {
      navigate('/');
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md h-screen p-6 hidden md:block">
          <nav className="flex flex-col gap-4 text-green-800 font-medium">
            <Link to="/add-land" className="hover:text-green-600">🌾 Add Land</Link>
            <Link to="/my-lands" className="hover:text-green-600">🗺 My Lands</Link>
            <Link to="/add-crop" className="hover:text-green-600">🌱 Add Crop</Link>
            <Link to="/my-crops" className="hover:text-green-600">🧺 My Crops</Link>
            <Link to="/orders" className="hover:text-green-600">📦 Orders</Link>
            <Link to="/rentals" className="hover:text-green-600">📑 Rentals</Link>
          </nav>
        </aside>

        {/* Main */}
        <main className="flex-1 p-6">
          <h2 className="text-3xl font-semibold text-green-800 mb-4">Welcome, Farmer 👨‍🌾</h2>
          <p className="text-gray-700">Use the sidebar to manage your land, crops, and orders.</p>

          {/* Dashboard Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
              <h3 className="text-xl font-bold text-green-700">Total Lands Listed</h3>
              <p className="text-2xl mt-2 text-gray-800">4</p> {/* Replace with actual count */}
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
              <h3 className="text-xl font-bold text-green-700">Crops for Sale</h3>
              <p className="text-2xl mt-2 text-gray-800">12</p> {/* Replace with actual count */}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default FarmerDashboard;
