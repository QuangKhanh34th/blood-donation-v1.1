import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../configs/axios";
import { toast } from "react-toastify";

// Async thunk to fetch cities from the API
export const fetchCities = createAsyncThunk(
  "cities/fetchCities",
  async () => {
    const response = await api.get("/city");
    return response.data;
  }
);

// Async thunk to add a new city
export const addCity = createAsyncThunk(
  "cities/addCity",
  async (cityData, { rejectWithValue }) => {
    try {
      const response = await api.post("/city", cityData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Async thunk to delete a city by ID
export const deleteCityById = createAsyncThunk(
  "cities/deleteCityById",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/city/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const citySlice = createSlice({
  name: "city",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchCities
      .addCase(fetchCities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
        toast.error(`Lỗi tải danh sách thành phố: ${action.payload || action.error.message}`);
      })
      // addCity
      .addCase(addCity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCity.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(addCity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
        toast.error(`Tạo thành phố thất bại: ${action.payload || action.error.message}`);
      })
      // deleteCityById
      .addCase(deleteCityById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCityById.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter(city => city.id !== action.payload);
      })
      .addCase(deleteCityById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
        toast.error(`Xóa thành phố thất bại: ${action.payload || action.error.message}`);
      });
  },
});

export default citySlice.reducer;
