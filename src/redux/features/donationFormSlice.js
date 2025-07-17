import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../configs/axios";
import { toast } from "react-toastify";

// Fetch all appointments
export const fetchAllAppointments = createAsyncThunk(
  "donationForm/fetchAllAppointments",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/appointments");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Update appointment status
export const updateAppointmentStatus = createAsyncThunk(
  "donationForm/updateStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      await api.patch(`/appointments/${id}/status`, null, {
        params: { status },
      });
      toast.success(`Cập nhật trạng thái thành công: ${status}`);
      return { id, status };
    } catch (err) {
      toast.error("Cập nhật trạng thái thất bại");
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Create donation detail
export const createDonationDetail = createAsyncThunk(
  "donationForm/createDonationDetail",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await api.post("/donation-details", payload);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Update the donation form slice
export const updateDonationDetail = createAsyncThunk(
  "donationForm/updateDonationDetail",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/donation-details/${id}`, payload);
      toast.success("Cập nhật thông tin hiến máu thành công!");
      return response.data;
    } catch (err) {
      toast.error("Cập nhật thông tin hiến máu thất bại");
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Fetch donation detail by appointment ID
export const fetchDonationDetailByAppointmentId = createAsyncThunk(
  "donationForm/fetchDonationDetailByAppointmentId",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/donation-details/${id}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);



const donationFormSlice = createSlice({
  name: "donationForm",
  initialState: {
    appointments: [],
    loading: false,
    error: null,
    donationDetail: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // FETCH all appointments
      .addCase(fetchAllAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = action.payload;
      })
      .addCase(fetchAllAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // UPDATE appointment status
      .addCase(updateAppointmentStatus.fulfilled, (state, action) => {
        const { id, status } = action.payload;
        const appointment = state.appointments.find((item) => item.id === id);
        if (appointment) {
          appointment.status = status;
        }
      })

      .addCase(updateDonationDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateDonationDetail.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateDonationDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      .addCase(fetchDonationDetailByAppointmentId.pending, (state) => {
        state.loading = true;
        state.donationDetail = null;
      })
      .addCase(fetchDonationDetailByAppointmentId.fulfilled, (state, action) => {
        state.loading = false;
        state.donationDetail = action.payload;
      })
      .addCase(fetchDonationDetailByAppointmentId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      ;
  },
});

export default donationFormSlice.reducer;
