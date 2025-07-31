import React, { useState,useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { placeOrder } from '../store/slices/orderSlice';
import Header from '../components/Header';
import { Link,useNavigate } from 'react-router-dom';

const OrderFormPage = () => {
  const { cropId, price } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
const user = useSelector((state) => state.auth.user);
useEffect(() => {
    if (!user ) {
      navigate('/');
    }
    if(user && user.role !== 'user') {
      navigate('/farmer-dashboard'); // Redirect if user is not a farmer
    }
  }, [user]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const totalPrice = quantity * parseFloat(pricePerKg);
    dispatch(placeOrder({ cropId, quantity, totalPrice }));
    navigate('/my-orders');
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

        <main className="flex-1 flex items-center justify-center p-6">
          <form onSubmit={handleSubmit} className="bg-white shadow-lg p-8 rounded-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-green-700">Order Crop</h2>

            <div className="mb-4">
              <label className="block text-gray-700">Quantity (kg)</label>
              <input
                type="number"
                required
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full px-4 py-2 border rounded-md"
                min="1"
              />
            </div>

            <p className="mb-4 text-gray-800">
              <strong>Total Price:</strong> ₹{quantity * pricePerKg}
            </p>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
            >
              Place Order
            </button>
          </form>
        </main>
      </div>
    </div>
  );
};

export default OrderFormPage;
