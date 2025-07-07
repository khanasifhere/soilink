import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API = 'http://localhost:4000/api';

const initialState = {
  userOrders: [],
  farmerOrders: [],
  loading: false,
  error: null,
  message: null,
};

const orderSlice = createSlice({
  name: 'order',
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
    setUserOrders(state, action) {
      state.loading = false;
      state.userOrders = action.payload;
    },
    setFarmerOrders(state, action) {
      state.loading = false;
      state.farmerOrders = action.payload;
    },
    clearOrderState(state) {
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
  setUserOrders,
  setFarmerOrders,
  clearOrderState,
} = orderSlice.actions;

export const placeOrder = (data) => async (dispatch) => {
  dispatch(request());
  try {
    const token = localStorage.getItem('token');
    const res = await axios.post(`${API}/order/place`, data, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    });
    dispatch(success(res.data));
    dispatch(getUserOrders());
  } catch (err) {
    dispatch(fail(err.response?.data?.message || 'Failed to place order'));
  }
};

export const getUserOrders = () => async (dispatch) => {
  dispatch(request());
  try {
    const token = localStorage.getItem('token');
    const res = await axios.get(`${API}/order/my-orders`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    dispatch(setUserOrders(res.data.orders)); // ✅ res.data is the array
  } catch (err) {
    dispatch(fail(err.response?.data?.message || 'Failed to get user orders'));
  }
};

export const getFarmerOrders = () => async (dispatch) => {
  dispatch(request());
  try {
    const token = localStorage.getItem('token');
    const res = await axios.get(`${API}/order/incoming`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    dispatch(setFarmerOrders(res.data)); // ✅ res.data is the array
  } catch (err) {
    dispatch(fail(err.response?.data?.message || 'Failed to get farmer orders'));
  }
};


// ✅ Farmer: Update order status (e.g., accepted, delivered)
export const updateOrderStatus = (orderId, status) => async (dispatch) => {
  dispatch(request());
  try {
    const res = await axios.put(
      `${API}/order/${orderId}/status`,
      { status },
      {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
      }
    );
    dispatch(success(res.data));
    dispatch(getFarmerOrders());
  } catch (err) {
    dispatch(fail(err.response?.data?.message || 'Failed to update order status'));
  }
};

export default orderSlice.reducer;
