// src/pages/MyLands.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFarmerLands } from '../store/slices/landSlice';
import Header from '../components/Header';
import { Link,useNavigate } from 'react-router-dom';

const MyLands = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { farmerLands, loading, error } = useSelector((state) => state.land);
 const { user } = useSelector((state) => state.auth);
 
   useEffect(() => {
     if (!user ) {
       navigate('/'); 
     }
     if(user&&user.role !== 'farmer') {
       navigate('/user-dashboard'); // Redirect if user is not a farmer
     }
   }, [user, navigate]);
  useEffect(() => {
    dispatch(getFarmerLands());
  }, [dispatch]);

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

        {/* Main Content */}
        <main className="flex-1 p-6">
          <h2 className="text-3xl font-semibold text-green-800 mb-4">My Lands</h2>

          {loading && <p>Loading your lands...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {farmerLands && farmerLands.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {farmerLands.map((land) => (
                <div key={land._id} className="bg-white p-4 rounded shadow">
                  <img
                    src={land.imageUrl || 'https://via.placeholder.com/300x200'}
                    alt="land"
                    className="w-full h-40 object-cover rounded"
                  />
                  <h3 className="text-xl font-bold text-green-700 mt-2">{land.location}</h3>
                  <p className="text-sm text-gray-600">{land.state}, {land.district}</p>
                  <p className="text-sm">Size: {land.size}</p>
                  <p className="text-sm">₹ {land.pricePerMonth}/month</p>
                  <p className="text-sm">Available: {land.isAvailable ? "Yes ✅" : "No ❌"}</p>
                </div>
              ))}
            </div>
          ) : (
            !loading && <p>No lands listed yet.</p>
          )}
        </main>
      </div>
    </div>
  );
};

export default MyLands;
