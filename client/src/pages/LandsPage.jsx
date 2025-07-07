import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllLands } from '../store/slices/landSlice';
import Header from '../components/Header';
import { Link, useNavigate } from 'react-router-dom';

const LandsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allLands, loading, error } = useSelector((state) => state.land);

  const [searchState, setSearchState] = useState('');
  const [searchDistrict, setSearchDistrict] = useState('');
  const [searchTehsil, setSearchTehsil] = useState('');
  const [searchPincode, setSearchPincode] = useState('');
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
    dispatch(getAllLands());
  }, [dispatch]);

  const handleRequestRent = (landId, pricePerMonth) => {
    navigate(`/rent/${landId}/${pricePerMonth}`);
  };

  const filteredLands = allLands.filter((land) => {
    return (
      land.state.toLowerCase().includes(searchState.toLowerCase()) &&
      land.district.toLowerCase().includes(searchDistrict.toLowerCase()) &&
      land.tehsil.toLowerCase().includes(searchTehsil.toLowerCase()) &&
      land.pincode.toLowerCase().includes(searchPincode.toLowerCase())
    );
  });

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

        <main className="flex-1 p-6 overflow-y-auto">
          <h2 className="text-3xl font-semibold text-green-800 mb-6">🌾 Available Lands</h2>

          {/* Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <input
              type="text"
              placeholder="Search by State"
              className="border border-gray-300 px-4 py-2 rounded-lg w-full"
              value={searchState}
              onChange={(e) => setSearchState(e.target.value)}
            />
            <input
              type="text"
              placeholder="Search by District"
              className="border border-gray-300 px-4 py-2 rounded-lg w-full"
              value={searchDistrict}
              onChange={(e) => setSearchDistrict(e.target.value)}
            />
            <input
              type="text"
              placeholder="Search by Tehsil"
              className="border border-gray-300 px-4 py-2 rounded-lg w-full"
              value={searchTehsil}
              onChange={(e) => setSearchTehsil(e.target.value)}
            />
            <input
              type="text"
              placeholder="Search by Pincode"
              className="border border-gray-300 px-4 py-2 rounded-lg w-full"
              value={searchPincode}
              onChange={(e) => setSearchPincode(e.target.value)}
            />
          </div>

          {/* Land Cards */}
          {loading ? (
            <p className="text-gray-700">Loading lands...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : filteredLands.length === 0 ? (
            <p className="text-gray-600">No lands match your search criteria.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLands.map((land) => (
                <div
                  key={land._id}
                  className="bg-white shadow-md rounded-xl p-4 border border-gray-200"
                >
                  {land.imageUrl && (
                    <img
                      src={land.imageUrl}
                      alt="Land"
                      className="w-full h-40 object-cover rounded-md mb-3"
                    />
                  )}
                  <h3 className="text-xl font-semibold text-green-700 mb-1">
                    {land.location || 'Unnamed Land'}
                  </h3>
                  <p><strong>State:</strong> {land.state}</p>
                  <p><strong>District:</strong> {land.district}</p>
                  <p><strong>Tehsil:</strong> {land.tehsil}</p>
                  <p><strong>Pincode:</strong> {land.pincode}</p>
                  <p><strong>Size:</strong> {land.size}</p>
                  <p><strong>Price:</strong> ₹{land.pricePerMonth} / month</p>
                  <p><strong>Available From:</strong> {new Date(land.availableFrom).toLocaleDateString()}</p>
                  <p><strong>Available To:</strong> {new Date(land.availableTo).toLocaleDateString()}</p>
                  <p className="mt-2 text-sm text-gray-600">
                    <strong>Status:</strong>{' '}
                    {land.isAvailable ? (
                      <span className="text-green-600 font-medium">Available</span>
                    ) : (
                      <span className="text-red-600 font-medium">Unavailable</span>
                    )}
                  </p>

                  {land.isAvailable && (
                    <button
                      onClick={() => handleRequestRent(land._id, land.pricePerMonth)}
                      className="mt-4 w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md"
                    >
                      Request Rent
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

export default LandsPage;
