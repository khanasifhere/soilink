import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Helper to safely parse localStorage JSON
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
      state.message = action.payload.msg;
    },
    otpVerificationSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.msg;
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
    forgotPasswordSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    resetPasswordSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    updatePasswordSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    getCurrentUserSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
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
  forgotPasswordSuccess,
  resetPasswordSuccess,
  updatePasswordSuccess,
  getCurrentUserSuccess,
  resetAuth,
} = authSlice.actions;

export default authSlice.reducer;

// =========================
//       THUNKS / ACTIONS
// =========================

const API = 'https://soilink.onrender.com/api/auth';

export const register = (data) => async (dispatch) => {
  dispatch(requestStart());
  try {
    const res = await axios.post(`${API}/register`, data);
    dispatch(registerSuccess(res.data));
  } catch (err) {
    dispatch(requestFail(err.response?.data?.msg || err.message));
  }
};

export const otpVerification = (data) => async (dispatch) => {
  dispatch(requestStart());
  try {
    const res = await axios.post(`${API}/verify-otp`, data);
    dispatch(otpVerificationSuccess({ msg: res.data.msg, user: res.data.user }));
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
    await axios.post(`${API}/logout`, {}, { withCredentials: true });
    dispatch(logoutSuccess('Logged out successfully'));
  } catch (err) {
    dispatch(requestFail(err.response?.data?.msg || err.message));
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  dispatch(requestStart());
  try {
    const res = await axios.post(`${API}/forgot-password`, { email });
    dispatch(forgotPasswordSuccess(res.data.msg));
  } catch (err) {
    dispatch(requestFail(err.response?.data?.msg || err.message));
  }
};

export const resetPassword = ({ token, newPassword }) => async (dispatch) => {
  dispatch(requestStart());
  try {
    const res = await axios.post(`${API}/reset-password/${token}`, { newPassword });
    dispatch(resetPasswordSuccess(res.data.msg));
  } catch (err) {
    dispatch(requestFail(err.response?.data?.msg || err.message));
  }
};

export const updatePassword = ({ currentPassword, newPassword }) => async (dispatch) => {
  dispatch(requestStart());
  try {
    const res = await axios.put(`${API}/update-password`, { currentPassword, newPassword }, {
      withCredentials: true,
    });
    dispatch(updatePasswordSuccess(res.data.msg));
  } catch (err) {
    dispatch(requestFail(err.response?.data?.msg || err.message));
  }
};

export const getCurrentUser = () => async (dispatch) => {
  dispatch(requestStart());
  try {
    const res = await axios.get(`${API}/me`, { withCredentials: true });
    dispatch(getCurrentUserSuccess(res.data));
  } catch (err) {
    dispatch(requestFail(err.response?.data?.msg || err.message));
  }
};

export const resetAuthState = () => (dispatch) => {
  dispatch(resetAuth());
};
