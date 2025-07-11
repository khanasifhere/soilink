import React, { useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { createRentalRequest } from '../store/slices/rentalSlice';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';

const RentalFormPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { landId, price } = useParams();
const user = useSelector((state) => state.auth.user);
useEffect(() => {
    if (!user ) {
      navigate('/');
    }
    if(user && user.role !== 'user') {
      navigate('/farmer-dashboard'); // Redirect if user is not a farmer
    }
  }, [user]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const totalMonths =
      Math.max(1, new Date(endDate).getMonth() - new Date(startDate).getMonth() + 1);
    const totalPrice = totalMonths * parseInt(price);

    dispatch(createRentalRequest({ landId, startDate, endDate, totalPrice }));
    navigate('/my-rentals');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="flex">
        {/* Sidebar same as UserDashboard */}
        <aside className="w-64 bg-white shadow-md h-screen p-6 hidden md:block">
          <nav className="flex flex-col gap-4 text-green-800 font-medium">
            <Link to="/lands" className="hover:text-green-600">🌾 Browse Lands</Link>
            <Link to="/crops" className="hover:text-green-600">🌱 Browse Crops</Link>
            <Link to="/my-orders" className="hover:text-green-600">📦 My Orders</Link>
            <Link to="/my-rentals" className="hover:text-green-600">📄 My Rental Requests</Link>
          </nav>
        </aside>

        {/* Rental Form */}
        <main className="flex-1 flex justify-center items-center p-6">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 shadow-lg rounded-md w-full max-w-md"
          >
            <h2 className="text-2xl font-bold mb-6 text-green-700">Rental Request</h2>

            <div className="mb-4">
              <label className="block text-gray-700">Start Date</label>
              <input
                type="date"
                required
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">End Date</label>
              <input
                type="date"
                required
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
            >
              Submit Request
            </button>
          </form>
        </main>
      </div>
    </div>
  );
};

export default RentalFormPage;
