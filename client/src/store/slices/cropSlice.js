// src/redux/slices/cropSlice.js
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API = 'https://soilink.onrender.com/api';

const initialState = {
  allCrops: [],
  farmerCrops: [],
  loading: false,
  error: null,
  message: null,
};

const cropSlice = createSlice({
  name: 'crop',
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
    setAllCrops(state, action) {
      state.loading = false;
      state.allCrops = action.payload;
    },
    setFarmerCrops(state, action) {
      state.loading = false;
      state.farmerCrops = action.payload;
    },
    clearCropState(state) {
      state.loading = false;
      state.error = null;
      state.message = null;
    }
  }
});

export const {
  request,
  success,
  fail,
  setAllCrops,
  setFarmerCrops,
  clearCropState
} = cropSlice.actions;

// 🟢 GET: All crops (public)
export const getAllCrops = () => async (dispatch) => {
  dispatch(request());
  try {
    const res = await axios.get(`${API}/crop`);
    dispatch(setAllCrops(res.data.crops));
  } catch (err) {
    dispatch(fail(err.response?.data?.message || "Failed to fetch crops"));
  }
};

// 🟢 GET: Farmer's crops (authenticated)
export const getFarmerCrops = () => async (dispatch) => {
  dispatch(request());
  try {
    const res = await axios.get(`${API}/crop/my-crops`, {
      withCredentials: true,
    });
    dispatch(setFarmerCrops(res.data.crops));
  } catch (err) {
    dispatch(fail(err.response?.data?.message || "Failed to fetch farmer crops"));
  }
};

// 🟡 POST: Create a crop (farmer only)
export const addCrop = (data) => async (dispatch) => {
  dispatch(request());
  try {
    const res = await axios.post(`${API}/crop/create`, data, {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
    });
    dispatch(success(res.data));
    dispatch(getFarmerCrops()); // refresh
  } catch (err) {
    dispatch(fail(err.response?.data?.message || "Failed to create crop"));
  }
};

// 🔄 PUT: Update crop availability (toggle status)
export const updateCropAvailability = (cropId, status) => async (dispatch) => {
  dispatch(request());
  try {
    const res = await axios.put(
      `${API}/crop/${cropId}/status`,
      { available: status },
      {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
      }
    );
    dispatch(success(res.data));
    dispatch(getFarmerCrops());
  } catch (err) {
    dispatch(fail(err.response?.data?.message || "Failed to update crop status"));
  }
};

export default cropSlice.reducer;
