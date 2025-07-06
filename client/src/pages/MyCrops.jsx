import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFarmerCrops } from '../store/slices/cropSlice';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const MyCrops = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { farmerCrops, loading, error } = useSelector((state) => state.crop);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!user ) {
      navigate('/');
    } 
    else if(user && user.role !== 'farmer') {
      navigate('/user-dashboard'); // Redirect if user is not a farmer
      
    }else {
      dispatch(getFarmerCrops());
    }
  }, [dispatch, user]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <aside className="w-64 bg-white shadow-md h-screen p-6 hidden md:block">
          <nav className="flex flex-col gap-4 text-green-800 font-medium">
            <Link to="/add-land">🌾 Add Land</Link>
            <Link to="/my-lands">🗺 My Lands</Link>
            <Link to="/add-crop">🌱 Add Crop</Link>
            <Link to="/my-crops">🧺 My Crops</Link>
            <Link to="/orders">📦 Orders</Link>
            <Link to="/rentals" className="hover:text-green-600">📑 Rentals</Link>
          </nav>
        </aside>

        <main className="flex-1 p-6">
          <h2 className="text-3xl font-semibold text-green-800 mb-4">My Crops</h2>
          {loading && <p>Loading crops...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {farmerCrops?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {farmerCrops.map((crop) => (
                <div key={crop._id} className="bg-white p-4 rounded shadow">
                  <img
                    src={crop.imageUrl || 'https://via.placeholder.com/300x200'}
                    alt="crop"
                    className="w-full h-40 object-cover rounded"
                  />
                  <h3 className="text-xl font-bold text-green-700 mt-2">{crop.cropType}</h3>
                  <p className="text-sm">Qty: {crop.quantity} kg</p>
                  <p className="text-sm">₹ {crop.pricePerKg}/kg</p>
                  <p className="text-sm">Harvest: {new Date(crop.harvestDate).toLocaleDateString()}</p>
                  <p className="text-sm">Available: {crop.isAvailable ? "Yes ✅" : "No ❌"}</p>
                </div>
              ))}
            </div>
          ) : (
            !loading && <p>No crops listed yet.</p>
          )}
        </main>
      </div>
    </div>
  );
};

export default MyCrops;
