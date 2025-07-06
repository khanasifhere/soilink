// src/pages/Register.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register, otpVerification } from '../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { message, error, loading, isAuthenticated, user } = useSelector((state) => state.auth);

  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'user' });
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');

  useEffect(() => {
    if (message === 'OTP sent successfully') {
      setOtpSent(true);
    }

    if (isAuthenticated && user) {
      navigate(user.role === 'farmer' ? '/farmer-dashboard' : '/user-dashboard');
    }
  }, [message, isAuthenticated, user, navigate]);

  const handleRegister = async (e) => {
    e.preventDefault();
    dispatch(register(form));
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    dispatch(otpVerification({ email: form.email, otp }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50 px-4">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl text-green-700">
            {otpSent ? 'Verify OTP' : 'Register on Soilink'}
          </CardTitle>
        </CardHeader>

        <CardContent>
          {otpSent ? (
            <form onSubmit={handleVerify} className="flex flex-col gap-4">
              <Label htmlFor="otp">Enter OTP</Label>
              <Input
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="123456"
                required
              />
              <Button type="submit" className="bg-green-600 hover:bg-green-700" disabled={loading}>
                {loading ? 'Verifying...' : 'Verify OTP'}
              </Button>
              {error && <p className="text-sm text-red-600">{error}</p>}
            </form>
          ) : (
            <form onSubmit={handleRegister} className="flex flex-col gap-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your Name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••"
                  required
                />
              </div>
              <div>
                <Label htmlFor="role">Role</Label>
                <Select
                  onValueChange={(value) => setForm({ ...form, role: value })}
                  defaultValue="user"
                >
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="farmer">Farmer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" className="bg-green-600 hover:bg-green-700" disabled={loading}>
                {loading ? 'Sending OTP...' : 'Send OTP'}
              </Button>
              {error && <p className="text-sm text-red-600">{error}</p>}
            </form>
          )}
        </CardContent>

        <CardFooter className="justify-center text-sm text-gray-700">
          Already have an account?{' '}
          <a href="/login" className="ml-1 text-green-600 hover:underline">
            Login
          </a>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
