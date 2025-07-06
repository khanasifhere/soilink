// src/components/Sidebar.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';

const Sidebar = () => {
  const { user } = useContext(AuthContext);

  if (!user) return null;

  return (
    <aside className="w-64 bg-green-100 h-screen p-4 shadow-md">
      <h2 className="text-xl font-bold mb-4 text-green-800">Dashboard</h2>

      {user.role === 'farmer' ? (
        <ul className="space-y-2">
          <li>
            <Link to="/farmer-dashboard" className="block p-2 rounded hover:bg-green-200">Home</Link>
          </li>
          <li>
            <Link to="/farmer/lands" className="block p-2 rounded hover:bg-green-200">Manage Lands</Link>
          </li>
          <li>
            <Link to="/farmer/crops" className="block p-2 rounded hover:bg-green-200">My Crops</Link>
          </li>
          <li>
            <Link to="/farmer/orders" className="block p-2 rounded hover:bg-green-200">Crop Orders</Link>
          </li>
        </ul>
      ) : (
        <ul className="space-y-2">
          <li>
            <Link to="/user-dashboard" className="block p-2 rounded hover:bg-green-200">Home</Link>
          </li>
          <li>
            <Link to="/user/rent-lands" className="block p-2 rounded hover:bg-green-200">Rent Land</Link>
          </li>
          <li>
            <Link to="/user/buy-crops" className="block p-2 rounded hover:bg-green-200">Buy Crops</Link>
          </li>
          <li>
            <Link to="/user/orders" className="block p-2 rounded hover:bg-green-200">My Orders</Link>
          </li>
        </ul>
      )}
    </aside>
  );
};

export default Sidebar;
