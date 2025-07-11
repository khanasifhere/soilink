import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword, resetAuthState } from '../store/slices/authSlice'; // adjust path if needed

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const { loading, message, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
    
  };

  useEffect(() => {
    // Clear previous messages after 5 seconds
    if (message || error) {
      const timer = setTimeout(() => {
        dispatch(resetAuthState());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message, error, dispatch]);

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px', margin: 'auto' }}>
      <h2>Forgot Password</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Sending...' : 'Send Reset Link'}
      </button>

      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default ForgotPassword;
