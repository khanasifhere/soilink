import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API = 'http://localhost:4000/api';

const initialState = {
  allLands: [],
  farmerLands: [],
  loading: false,
  error: null,
  message: null,
};

const landSlice = createSlice({
  name: 'land',
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
    setAllLands(state, action) {
      state.loading = false;
      state.allLands = action.payload;
    },
    setFarmerLands(state, action) {
      state.loading = false;
      state.farmerLands = action.payload;
    },
    clearLandState(state) {
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
  setAllLands,
  setFarmerLands,
  clearLandState,
} = landSlice.actions;

// ✅ GET: Public - All lands
export const getAllLands = () => async (dispatch) => {
  dispatch(request());
  try {
    const res = await axios.get(`${API}/land`);
    dispatch(setAllLands(res.data.lands));
  } catch (err) {
    dispatch(fail(err.response?.data?.message || 'Failed to fetch lands'));
  }
};

// ✅ GET: Farmer's own lands
export const getFarmerLands = () => async (dispatch) => {
  dispatch(request());
  try {
    const token = localStorage.getItem('token');
    const res = await axios.get(`${API}/land/my-lands`, {
      withCredentials: true,
      headers: {
        
        Authorization: `Bearer ${token}`, // ✅ Include token here
      },
    });
    dispatch(setFarmerLands(res.data.lands));
  } catch (err) {
    dispatch(fail(err.response?.data?.message || 'Failed to fetch farmer lands'));
  }
};

// ✅ POST: Create a new land
export const addLand = (data) => async (dispatch) => {
  dispatch(request());
  try {
    const token = localStorage.getItem('token'); // or from cookie if using `withCredentials`
    const res = await axios.post(`${API}/land/create`, data, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // ✅ Include token here
      },
    });
    dispatch(success(res.data));
    dispatch(getFarmerLands());
  } catch (err) {
    dispatch(fail(err.response?.data?.message || 'Failed to create land'));
  }
};



// ✅ PUT: Update land status (available / unavailable)
export const updateLandStatus = (landId, status) => async (dispatch) => {
  dispatch(request());
  try {
    const res = await axios.put(
      `${API}/land/${landId}/status`,
      { available: status },
      {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
      }
    );
    dispatch(success(res.data));
    dispatch(getFarmerLands());
  } catch (err) {
    dispatch(fail(err.response?.data?.message || 'Failed to update land status'));
  }
};

export default landSlice.reducer;
