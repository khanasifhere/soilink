import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserRentals } from '../store/slices/rentalSlice';
import { Link,useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const MyRentalsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userRentals, loading, error } = useSelector((state) => state.rental);
const user = useSelector((state) => state.auth.user);
useEffect(() => {
    if (!user ) {
      navigate('/');
    }
    if(user && user.role !== 'user') {
      navigate('/farmer-dashboard'); // Redirect if user is not a farmer
    }
  }, [user]);
  useEffect(() => {
    dispatch(getUserRentals());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md h-screen p-6 hidden md:block">
          <nav className="flex flex-col gap-4 text-green-800 font-medium">
            <Link to="/lands" className="hover:text-green-600">🌾 Browse Lands</Link>
            <Link to="/crops" className="hover:text-green-600">🌱 Browse Crops</Link>
            <Link to="/my-orders" className="hover:text-green-600">📦 My Orders</Link>
            <Link to="/my-rentals" className="hover:text-green-600">📄 My Rental Requests</Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <h2 className="text-3xl font-semibold text-green-800 mb-6">📄 My Rental Requests</h2>

          {loading ? (
            <p className="text-gray-600">Loading rental requests...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : userRentals&&userRentals.length === 0 ? (
            <p className="text-gray-600">You have not submitted any rental requests.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    
              {userRentals&&userRentals.map((rental) => (
                <div
                
                  key={rental._id}
                  className="bg-white shadow-md border border-gray-200 rounded-xl p-4"
                >
                    
                  <h3 className="text-lg font-bold text-green-700 mb-2">
                    {rental.landId?.location || 'Land Details'}
                  </h3>
                  <p><strong>State:</strong> {rental.landId?.state}</p>
                  <p><strong>District:</strong> {rental.landId?.district}</p>
                  <p><strong>Tehsil:</strong> {rental.landId?.tehsil}</p>
                  <p><strong>Start Date:</strong> {new Date(rental.startDate).toLocaleDateString()}</p>
                  <p><strong>End Date:</strong> {new Date(rental.endDate).toLocaleDateString()}</p>
                  <p><strong>Total Price:</strong> ₹{rental.totalPrice}</p>
                  <p><strong>Status:</strong> 
                    <span className={`ml-1 font-semibold ${
                      rental.status === 'approved' ? 'text-green-600' :
                      rental.status === 'rejected' ? 'text-red-600' :
                      'text-yellow-600'
                    }`}>
                      {rental.status}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default MyRentalsPage;
