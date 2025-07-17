import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      return action.payload;
    },
    logout: () => {
      return initialState;
    },
    // ✅ Thêm reducer này
    updateUser: (state, action) => {
      return {
        ...state,
        ...action.payload,
        token: state.token,
      };
    },
  },
});

// ✅ Thêm export action mới
export const { login, logout, updateUser } = userSlice.actions;

export default userSlice.reducer;
