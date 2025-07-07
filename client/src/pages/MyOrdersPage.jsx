import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserOrders } from '../store/slices/orderSlice';
import Header from '../components/Header';
import { Link,useNavigate } from 'react-router-dom';

const MyOrdersPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userOrders, loading, error } = useSelector((state) => state.order);
const user = useSelector((state) => state.auth.user);
useEffect(() => {
    if (!user ) {
      navigate('/');
    }
    if(user && user.role !== 'user') {
      navigate('/farmer-dashboard'); // Redirect if user is not a farmer
    }
  }, [user,navigate]);
  useEffect(() => {
    dispatch(getUserOrders());
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

        <main className="flex-1 p-6 overflow-y-auto">
          <h2 className="text-3xl font-semibold text-green-800 mb-6">📦 My Crop Orders</h2>

          {loading ? (
            <p className="text-gray-600">Loading your orders...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : userOrders&&userOrders.length === 0 ? (
            <p className="text-gray-600">You have not placed any orders yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {userOrders&&userOrders.map((order) => (
                <div
                  key={order._id}
                  className="bg-white shadow-md border border-gray-200 rounded-lg p-4"
                >
                  <h3 className="text-xl font-bold text-green-700 mb-2">
                    Crop: {order.cropId?.cropType || 'Unknown'}
                  </h3>
                  <p><strong>Type:</strong> {order.cropId?.cropType}</p>
                  <p><strong>Quantity:</strong> {order.quantity} kg</p>
                  <p><strong>Total Price:</strong> ₹{order.totalPrice}</p>
                  <p><strong>Status:</strong>{' '}
                    <span className={`font-semibold ${
                      order.status === 'pending' ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {order.status}
                    </span>
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Ordered On: {new Date(order.createdAt).toLocaleDateString()}
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

export default MyOrdersPage;
