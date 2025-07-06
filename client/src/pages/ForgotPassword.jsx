import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:4000/api/auth/forgot-password', { email });
    alert('Password reset link sent');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <button type="submit">Send Reset Link</button>
    </form>
  );
};

export default ForgotPassword;