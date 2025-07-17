import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../configs/axios";
import { toast } from "react-toastify";

// Async thunk to fetch all addresses
export const fetchAddresses = createAsyncThunk(
  "addresses/fetchAddresses",
  async () => {
    const response = await api.get("/addresses");
    return response.data;
  }
);

// Async thunk to fetch a single address by ID
export const fetchAddressById = createAsyncThunk(
  "addresses/fetchAddressById",
  async (id) => {
    const response = await api.get(`/addresses/${id}`);
    return response.data;
  }
);

// Async thunk to create new address 
export const createAddress = createAsyncThunk(
  "addresses/createAddress",
  async (addressData, { rejectWithValue }) => {
    try {
      const response = await api.post(`/addresses`, addressData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message)
    }
  }
);

// Async thunk to delete address by ID
export const deleteAddress = createAsyncThunk(
  "addresses/deleteAddress",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/addresses/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState: {
    data: [],
    loading: false,
    error: null,
    selectedAddress: null,
    selectedLoading: false,
    selectedError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchAddresses
      .addCase(fetchAddresses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAddresses.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAddresses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
        toast.error(`Lỗi tải danh sách địa chỉ: ${action.payload || action.error.message}`);
      })

      // fetchAddressByID
      .addCase(fetchAddressById.pending, (state) => {
        state.selectedLoading = true;
        state.selectedError = null;
        state.selectedAddress = null;
      })
      .addCase(fetchAddressById.fulfilled, (state, action) => {
        state.selectedLoading = false;
        state.selectedAddress = action.payload;
      })
      .addCase(fetchAddressById.rejected, (state, action) => {
        state.selectedLoading = false;
        state.selectedError = action.payload || action.error.message;
        state.selectedAddress = null;
        toast.error(`Lỗi tải thông tin địa chỉ: ${action.payload || action.error.message}`);
      })

      // createAddress
      .addCase(createAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(createAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
        toast.error(`Tạo địa chỉ thất bại: ${action.payload || action.error.message}`);
      })
      
      // deleteAddress
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.data = state.data.filter(addr => addr.id !== action.payload);
      })
      .addCase(deleteAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
        toast.error(`Xóa địa chỉ thất bại: ${action.payload || action.error.message}`);
      });
  },
});

export default addressSlice.reducer;
