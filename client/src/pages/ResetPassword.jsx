import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`http://localhost:4000/api/auth/reset-password/${token}`, { newPassword });
    alert('Password reset successful');
    navigate('/login');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="New Password" required />
      <button type="submit">Reset Password</button>
    </form>
  );
};

export default ResetPassword;