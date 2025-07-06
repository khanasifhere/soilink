import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from '../components/Header';

const Home = () => {
  const navigate = useNavigate();

  const { user, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated && user) {
      navigate(user.role === 'farmer' ? '/farmer-dashboard' : '/user-dashboard');
    }
  }, [isAuthenticated, user, navigate]);

  // Show home page only if user is not authenticated
  if (isAuthenticated && user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      <Header />
      <main className="flex flex-col items-center justify-center text-center px-4 py-12">
        <h1 className="text-5xl font-extrabold text-green-900 mb-6 font-serif">Welcome to Soilink 🌱</h1>
        <p className="text-xl text-gray-700 max-w-4xl mb-10 leading-relaxed">
          Bridging the gap between <span className="font-semibold text-green-800">farmers</span> and <span className="font-semibold text-green-800">consumers</span> through a smart agriculture platform. <br />
          <span className="text-green-700 font-medium">Farmers</span> can rent out their unused land during off-seasons and sell freshly harvested crops.<br />
          <span className="text-green-700 font-medium">Users</span> can easily rent land for agri-purposes and purchase chemical-free farm produce directly.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mb-10">
          <img
            src="https://images.unsplash.com/photo-1589927986089-35812388d1ef"
            alt="Farmland for rent"
            className="rounded-xl shadow-lg w-full h-72 object-cover"
          />
          <img
            src="https://images.unsplash.com/photo-1576402187877-681f8a1a9622"
            alt="Organic produce"
            className="rounded-xl shadow-lg w-full h-72 object-cover"
          />
        </div>

        <div className="bg-white shadow-md rounded-xl px-8 py-6 text-left max-w-4xl text-green-800 border border-green-200">
          <h3 className="text-2xl font-bold mb-3">🌾 Features at a Glance:</h3>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>For Farmers:</strong> List available land with map coordinates, set rental rates, and sell your seasonal crops.</li>
            <li><strong>For Users:</strong> Browse available farmland to rent for organic gardening or small-scale farming. Buy fresh crops directly from trusted farmers.</li>
            <li>All users and farmers are OTP-verified for secure transactions.</li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default Home;
