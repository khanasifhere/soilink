import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';
import { addCrop } from '../store/slices/cropSlice';

const AddCrop = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.crop);
  const user = useSelector((state) => state.auth.user);

  const [formData, setFormData] = useState({
    cropType: '',
    quantity: '',
    pricePerKg: '',
    harvestDate: '',
    imageUrl: '',
    isAvailable: true,
  });

  useEffect(() => {
    if (!user ) {
      navigate('/');
    }
    if(user && user.role !== 'farmer') {
      navigate('/user-dashboard'); // Redirect if user is not a farmer
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(addCrop(formData));
      navigate('/my-crops');
    } catch (err) {
      alert('Failed to add crop');
      console.error(err);
    }
  };

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
          <div className="max-w-xl mx-auto bg-white shadow p-6 rounded">
            <h2 className="text-2xl font-bold mb-4 text-green-800">Add New Crop</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input name="cropType" required value={formData.cropType} onChange={handleChange} placeholder="Crop Type" className="w-full p-2 border rounded" />
              <input name="quantity" required value={formData.quantity} onChange={handleChange} placeholder="Quantity (kg)" type="number" className="w-full p-2 border rounded" />
              <input name="pricePerKg" required value={formData.pricePerKg} onChange={handleChange} placeholder="Price per Kg" type="number" className="w-full p-2 border rounded" />
              <input name="harvestDate" required value={formData.harvestDate} onChange={handleChange} type="date" className="w-full p-2 border rounded" />
              <input name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="Image URL" className="w-full p-2 border rounded" />
              <button type="submit" disabled={loading} className="bg-green-600 text-white px-4 py-2 rounded">
                {loading ? 'Adding...' : 'Add Crop'}
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddCrop;
