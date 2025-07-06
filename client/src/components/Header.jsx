// src/components/Header.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, resetAuth } from '../store/slices/authSlice.js';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const Header = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
     dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="text-3xl font-bold font-serif text-green-700 hover:text-green-900 transition"
        >
          🌾 Soilink
        </Link>

        <nav>
          {isAuthenticated && user ? (
            <Button onClick={handleLogout} className="text-white bg-green-700 hover:bg-green-800">
              Logout
            </Button>
          ) : (
            <div className="flex gap-3">
              <Link to="/login">
                <Button>Login</Button>
              </Link>
              <Link to="/register">
                <Button>Sign Up</Button>
              </Link>
            </div>
          )}
        </nav>
      </div>
      <Separator />
    </header>
  );
};

export default Header;
