// src/pages/AddLand.jsx
import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate,Link } from 'react-router-dom';
import Header from '../components/Header.jsx';
import { addLand } from '../store/slices/landSlice';

const AddLand = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.land);
const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user ) {
      navigate('/'); 
    }
    if(user&&user.role !== 'farmer') {
      navigate('/user-dashboard'); // Redirect if user is not a farmer
    }
  }, [user]);
  const [formData, setFormData] = useState({
    location: '',
    coordinates: { lat: '', lng: '' },
    state: '',
    district: '',
    tehsil: '',
    pincode: '',
    size: '',
    pricePerMonth: '',
    availableFrom: '',
    availableTo: '',
    imageUrl: '',
    isAvailable: true,
  });

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await dispatch(addLand(formData)) // ✅ critical fix
    navigate('/my-lands');
  } catch (err) {
    alert('Failed to add land: ' + err);
    console.error('Error adding land:', err);
  }
};


  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'lat' || name === 'lng') {
      setFormData((prev) => ({
        ...prev,
        coordinates: { ...prev.coordinates, [name]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
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
        <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded">
          <h2 className="text-2xl font-bold mb-4 text-green-800">Add New Land</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input name="location" value={formData.location} onChange={handleChange} placeholder="Location Description" className="w-full p-2 border rounded" />

            <div className="flex gap-4">
              <input
                name="lat"
                value={formData.coordinates.lat}
                onChange={handleChange}
                required
                placeholder="Latitude"
                className="w-1/2 p-2 border rounded"
              />
              <input
                name="lng"
                value={formData.coordinates.lng}
                onChange={handleChange}
                required
                placeholder="Longitude"
                className="w-1/2 p-2 border rounded"
              />
            </div>

            <input name="state" value={formData.state} onChange={handleChange} required placeholder="State" className="w-full p-2 border rounded" />
            <input name="district" value={formData.district} onChange={handleChange} required placeholder="District" className="w-full p-2 border rounded" />
            <input name="tehsil" value={formData.tehsil} onChange={handleChange} required placeholder="Tehsil" className="w-full p-2 border rounded" />
            <input name="pincode" value={formData.pincode} onChange={handleChange} required placeholder="Pincode" className="w-full p-2 border rounded" />
            <input name="size" value={formData.size} onChange={handleChange} required placeholder="Size (e.g., 1 Acre)" className="w-full p-2 border rounded" />
            <input name="pricePerMonth" value={formData.pricePerMonth} onChange={handleChange} required placeholder="Rental Price (per month)" className="w-full p-2 border rounded" />
            <input type="date" name="availableFrom" value={formData.availableFrom} onChange={handleChange} required className="w-full p-2 border rounded" />
            <input type="date" name="availableTo" value={formData.availableTo} onChange={handleChange} required className="w-full p-2 border rounded" />
            <input name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="Image URL" className="w-full p-2 border rounded" />

            <button type="submit" disabled={loading} className="bg-green-600 text-white px-4 py-2 rounded">
              {loading ? 'Adding...' : 'Add Land'}
            </button>
          </form>
        </div>
      </main>
    </div>
  </div>
);

};

export default AddLand;
