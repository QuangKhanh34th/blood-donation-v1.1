import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  history: [],
  selectedProgram: null,
  currentAppointment: null,
};

const bloodHistorySlice = createSlice({
  name: "bloodHistory",
  initialState,
  reducers: {
    setDonationHistory: (state, action) => {
      state.history = action.payload;
    },
    clearDonationHistory: () => {
      return initialState;
    },
    setSelectedProgram: (state, action) => {
      state.selectedProgram = action.payload;
    },
    clearSelectedProgram: (state) => {
      state.selectedProgram = null;
    },
    setCurrentAppointment: (state, action) => {
      state.currentAppointment = action.payload;
    },
    clearCurrentAppointment: (state) => {
      state.currentAppointment = null;
    },
  },
});

export const {
  setDonationHistory,
  clearDonationHistory,
  setSelectedProgram,
  clearSelectedProgram,
  setCurrentAppointment,
  clearCurrentAppointment,
} = bloodHistorySlice.actions;

export default bloodHistorySlice.reducer;

// ✅ Selector: Trả về appointment hiện tại nếu chưa hoàn thành
export const selectActiveAppointment = (state) =>
  state.bloodHistory.currentAppointment &&
  state.bloodHistory.currentAppointment.status !== "FULFILLED"
    ? state.bloodHistory.currentAppointment
    : null;
