import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import ResetPassword from './pages/ResetPassword.jsx';
import OTP from './pages/OTP.jsx';
import UserDashboard from './components/UserDashboard.jsx';
import FarmerDashboard from './components/FarmerDashboard.jsx';
import AddCrop from './pages/AddCrop.jsx';
import MyCrops from './pages/MyCrops.jsx';
import AddLand from './pages/AddLand.jsx';
import MyLands from './pages/MyLands.jsx';
import IncomingOrders from './pages/IncomingOrders.jsx';
import IncomingRentals from './pages/IncomingRentals.jsx'; // Assuming this is the same component

const App = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/otp" element={<OTP />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="/reset-password/:token" element={<ResetPassword />} />
    <Route path="/user-dashboard" element={<UserDashboard />} />
    <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
    <Route path="/add-crop" element={<AddCrop />} />
    <Route path="/my-crops" element={<MyCrops />} />
    <Route path="/add-land" element={<AddLand />} />
    <Route path="/my-lands" element={<MyLands />} /> {/* Assuming this is the same component */}
    <Route path="/orders" element={<IncomingOrders />} /> {/* Fallback route */}
    <Route path="/rentals" element={<IncomingRentals />} /> {/* Fallback to Home for unmatched routes */}
  </Routes>
);

export default App;
