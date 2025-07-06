// src/pages/IncomingRentals.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getFarmerRentalRequests,
  updateRentalStatus,
} from '../store/slices/rentalSlice';
import Header from '../components/Header';
import { Link ,useNavigate} from 'react-router-dom';

const IncomingRentals = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { farmerRentals, loading, error } = useSelector((state) => state.rental);
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
    dispatch(getFarmerRentalRequests());
  }, [dispatch]);

  const handleStatusChange = (rentalId, status) => {
    dispatch(updateRentalStatus(rentalId, status));
  };

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
          <h2 className="text-3xl font-semibold text-green-800 mb-4">📑 Incoming Rental Requests</h2>

          {loading && <p>Loading requests...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {farmerRentals&&farmerRentals.length > 0 ? (
            <div className="space-y-4">
              {farmerRentals.map((rental) => (
                <div key={rental._id} className="bg-white p-4 rounded shadow">
                  <h3 className="text-xl font-bold text-green-700">
                    {rental.landId?.location || 'Unknown Location'}
                  </h3>
                  <p className="text-sm text-gray-700">From: {rental.startDate?.slice(0, 10)}</p>
                  <p className="text-sm text-gray-700">To: {rental.endDate?.slice(0, 10)}</p>
                  <p className="text-sm text-gray-700">Total: ₹{rental.totalPrice}</p>
                  <p className="text-sm text-gray-700">Status: <strong>{rental.status}</strong></p>

                  {rental.status === 'requested' && (
                    <div className="mt-2 space-x-2">
                      <button
                        onClick={() => handleStatusChange(rental._id, 'approved')}
                        className="bg-green-600 text-white px-3 py-1 rounded"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleStatusChange(rental._id, 'rejected')}
                        className="bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            !loading && <p>No rental requests yet.</p>
          )}
        </main>
      </div>
    </div>
  );
};

export default IncomingRentals;
