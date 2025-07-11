import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword, resetAuthState } from '../store/slices/authSlice'; // adjust path as needed

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const { token } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, message, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword({ token, newPassword }));
  };

  useEffect(() => {
    if (message === 'Password reset successful') {
      const timeout = setTimeout(() => {
        navigate('/login');
      }, 2000);
      return () => clearTimeout(timeout);
    }

    if (message || error) {
      const clear = setTimeout(() => {
        dispatch(resetAuthState());
      }, 5000);
      return () => clearTimeout(clear);
    }
  }, [message, error, navigate, dispatch]);

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px', margin: 'auto' }}>
      <h2>Reset Password</h2>
      <input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="New Password"
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Resetting...' : 'Reset Password'}
      </button>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default ResetPassword;
