import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFarmerOrders, updateOrderStatus } from '../store/slices/orderSlice';
import Header from '../components/Header';
import { Link ,useNavigate} from 'react-router-dom';

const IncomingOrders = () => {
  const dispatch = useDispatch();
    const navigate = useNavigate();
  const { farmerOrders, loading, error } = useSelector((state) => state.order);
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
    dispatch(getFarmerOrders());
  }, [dispatch]);

  const handleStatusChange = (orderId, status) => {
    dispatch(updateOrderStatus(orderId, status));
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
          <h2 className="text-3xl font-semibold text-green-800 mb-4">📦 Incoming Orders</h2>

          {loading && <p>Loading orders...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {farmerOrders && farmerOrders.length > 0 ? (
            <div className="space-y-4">
              {farmerOrders.map((order) => (
                <div key={order._id} className="bg-white p-4 rounded shadow">
                  <h3 className="text-xl font-bold text-green-700">Crop: {order.cropId?.cropType}</h3>
                  <p className="text-sm text-gray-700">Quantity: {order.quantity} Kg</p>
                  <p className="text-sm text-gray-700">Total Price: ₹ {order.totalPrice}</p>
                  <p className="text-sm text-gray-700">Status: <strong>{order.status}</strong></p>
                  
                  {order.status === 'pending' && (
                    <div className="mt-2 space-x-2">
                      <button
                        onClick={() => handleStatusChange(order._id, 'completed')}
                        className="bg-green-600 text-white px-3 py-1 rounded"
                      >
                        Mark as Completed
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            !loading && <p>No incoming orders yet.</p>
          )}
        </main>
      </div>
    </div>
  );
};

export default IncomingOrders;
