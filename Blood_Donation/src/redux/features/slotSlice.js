import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../configs/axios";

// Async thunk to fetch slots from the API
export const fetchSlots = createAsyncThunk(
  "slots/fetchSlots",
  async () => {
    const response = await api.get("/slots");
    return response.data;
  }
);

// Async thunk to add a new slot
export const addSlot = createAsyncThunk(
  "slots/addSlot",
  async (slotData, { rejectWithValue }) => {
    try {
      const response = await api.post("/slots", slotData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);



const slotSlice = createSlice({
  name: "slot",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchSlots
      .addCase(fetchSlots.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSlots.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchSlots.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // addSlot
      .addCase(addSlot.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addSlot.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(addSlot.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
  },
});

export default slotSlice.reducer;
