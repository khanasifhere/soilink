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
          <p className="text-gray-700">Manage all your farming activities from one place.</p>

          {/* Feature Description Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
              <h3 className="text-xl font-bold text-green-700">🌾 Add Land</h3>
              <p className="mt-2 text-gray-700">
                List your available land for rent during off-season by visiting the <Link to="/add-land" className="text-green-700 underline hover:text-green-600">Add Land</Link> page.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
              <h3 className="text-xl font-bold text-green-700">🌱 Add Crops</h3>
              <p className="mt-2 text-gray-700">
                Sell your produce directly by adding it to the <Link to="/add-crop" className="text-green-700 underline hover:text-green-600">Add Crop</Link> section.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
              <h3 className="text-xl font-bold text-green-700">📦 Manage Orders</h3>
              <p className="mt-2 text-gray-700">
                Track and manage incoming crop orders in the <Link to="/orders" className="text-green-700 underline hover:text-green-600">Orders</Link> section.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
              <h3 className="text-xl font-bold text-green-700">📑 Rental Requests</h3>
              <p className="mt-2 text-gray-700">
                View land rental requests and manage availability through the <Link to="/rentals" className="text-green-700 underline hover:text-green-600">Rentals</Link> page.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default FarmerDashboard;
