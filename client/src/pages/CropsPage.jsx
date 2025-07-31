import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCrops } from '../store/slices/cropSlice';
import Header from '../components/Header';
import { Link, useNavigate } from 'react-router-dom';

const CropsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allCrops, loading, error } = useSelector((state) => state.crop);
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
    dispatch(getAllCrops());
  }, [dispatch]);

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

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <h2 className="text-3xl font-semibold text-green-800 mb-6">🌱 Available Crops</h2>

          {loading ? (
            <p className="text-gray-700">Loading crops...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : allCrops.length === 0 ? (
            <p className="text-gray-600">No crops available at the moment.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {allCrops.map((crop) => (
                <div
                  key={crop._id}
                  className="bg-white shadow-md rounded-xl p-4 border border-gray-200"
                >
                  {crop.imageUrl && (
                    <img
                      src={crop.imageUrl}
                      alt={crop.name}
                      className="w-full h-40 object-cover rounded-md mb-3"
                    />
                  )}
                  <h3 className="text-xl font-semibold text-green-700 mb-1">{crop.cropType}</h3>
                  
                  <p><strong>Price:</strong> ₹{crop.pricePerKg} / kg</p>
                  <p><strong>Quantity:</strong> {crop.quantity} kg</p>
                  
                  <p className="mt-2 text-sm text-gray-600">
                    <strong>Status:</strong>{' '}
                    {crop.isAvailable ? (
                      <span className="text-green-600 font-medium">Available</span>
                    ) : (
                      <span className="text-red-600 font-medium">Unavailable</span>
                    )}
                  </p>

                  {crop.isAvailable && (
                    <button
                      onClick={() => navigate(`/order/${crop._id}/${crop.price}`)}
                      className="mt-4 w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md"
                    >
                      Buy Crop
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default CropsPage;
