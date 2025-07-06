import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API = 'http://localhost:4000/api';

const initialState = {
  userRentals: [],
  farmerRentals: [],
  loading: false,
  error: null,
  message: null,
};

const rentalSlice = createSlice({
  name: 'rental',
  initialState,
  reducers: {
    request(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    success(state, action) {
      state.loading = false;
      state.message = action.payload.message;
    },
    fail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    setUserRentals(state, action) {
      state.loading = false;
      state.userRentals = action.payload;
    },
    setFarmerRentals(state, action) {
      state.loading = false;
      state.farmerRentals = action.payload;
    },
    clearRentalState(state) {
      state.loading = false;
      state.error = null;
      state.message = null;
    },
  },
});

export const {
  request,
  success,
  fail,
  setUserRentals,
  setFarmerRentals,
  clearRentalState,
} = rentalSlice.actions;

// Helper to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // ✅ token added here
    },
  };
};

// ✅ POST: Create rental request (user)
export const createRentalRequest = (data) => async (dispatch) => {
  dispatch(request());
  try {
    const res = await axios.post(`${API}/rental/request`, data, getAuthHeaders());
    dispatch(success(res.data));
    dispatch(getUserRentals());
  } catch (err) {
    dispatch(fail(err.response?.data?.message || 'Failed to create rental request'));
  }
};

// ✅ GET: User's rental requests
export const getUserRentals = () => async (dispatch) => {
  dispatch(request());
  try {
    const res = await axios.get(`${API}/rental/my-requests`, getAuthHeaders());
    dispatch(setUserRentals(res.data.rentals));
  } catch (err) {
    dispatch(fail(err.response?.data?.message || 'Failed to fetch user rentals'));
  }
};

// ✅ GET: Farmer's incoming rental requests
export const getFarmerRentalRequests = () => async (dispatch) => {
  dispatch(request());
  try {
    const res = await axios.get(`${API}/rental/incoming`, getAuthHeaders());
    dispatch(setFarmerRentals(res.data.rentals));
  } catch (err) {
    dispatch(fail(err.response?.data?.message || 'Failed to fetch farmer rentals'));
  }
};

// ✅ PUT: Update rental status (farmer only)
export const updateRentalStatus = (rentalId, status) => async (dispatch) => {
  dispatch(request());
  try {
    const res = await axios.put(
      `${API}/rental/${rentalId}/status`,
      { status },
      getAuthHeaders()
    );
    dispatch(success(res.data));
    dispatch(getFarmerRentalRequests());
  } catch (err) {
    dispatch(fail(err.response?.data?.message || 'Failed to update rental status'));
  }
};

export default rentalSlice.reducer;
