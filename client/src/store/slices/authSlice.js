import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Load user from localStorage
function safeJSONParse(item) {
  try {
    return JSON.parse(item);
  } catch {
    return null;
  }
}

const storedUser = safeJSONParse(localStorage.getItem('user'));

const initialState = {
  user: storedUser,
  loading: false,
  error: null,
  message: null,
  isAuthenticated: !!storedUser,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    requestStart: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    requestSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload || null;
    },
    requestFail: (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Something went wrong';
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    otpVerificationSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      localStorage.setItem('user', JSON.stringify(action.payload.user));
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      localStorage.setItem('user', JSON.stringify(action.payload.user));
    },
    logoutSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('user');
    },
    resetAuth: (state) => {
      state.loading = false;
      state.error = null;
      state.message = null;
    },
  },
});

export const {
  requestStart,
  requestSuccess,
  requestFail,
  registerSuccess,
  otpVerificationSuccess,
  loginSuccess,
  logoutSuccess,
  resetAuth,
} = authSlice.actions;

export default authSlice.reducer;

// =======================
// ACTIONS (same file)
// =======================

const API = 'http://localhost:4000/api/auth';

export const register = (data) => async (dispatch) => {
  dispatch(requestStart());
  try {
    const res = await axios.post(`${API}/register`, data);
    dispatch(registerSuccess(res.data));
  } catch (err) {
    dispatch(requestFail(err.response?.data?.msg || err.message));
  }
};

export const otpVerification = ({ email, otp }) => async (dispatch) => {
  dispatch(requestStart());
  try {
    const res = await axios.post(`${API}/verify-otp`, { email, otp });
    dispatch(otpVerificationSuccess(res.data));
  } catch (err) {
    dispatch(requestFail(err.response?.data?.msg || err.message));
  }
};

export const login = (data) => async (dispatch) => {
  dispatch(requestStart());
  try {
    const res = await axios.post(`${API}/login`, data, {
      withCredentials: true,
    });
    const token = res.data.token;
    const payload = JSON.parse(atob(token.split('.')[1]));
    dispatch(loginSuccess({ user: payload, message: 'Login successful' }));
  } catch (err) {
    dispatch(requestFail(err.response?.data?.msg || err.message));
  }
};

export const logout = () => async (dispatch) => {
  dispatch(requestStart());
  try {
    await axios.post(`${API}/logout`, { withCredentials: true });
    dispatch(logoutSuccess('Logged out successfully'));
  } catch (err) {
    dispatch(requestFail(err.response?.data?.msg || err.message));
  }
};
export const resetAuthState = () => (dispatch) => {
  dispatch(resetAuth());
};