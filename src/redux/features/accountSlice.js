import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../configs/axios";
import { toast, ToastContainer } from "react-toastify";

// Async thunk to fetch accounts from the API
export const fetchAccounts = createAsyncThunk(
  "accounts/fetchAccounts",
  async () => {
    const response = await api.get("/admin/users");
    // Add a 'key' property for AntD Table
    return response.data.map((user) => ({
      ...user,
      key: user.userID,
    }));
  }
);

// Async thunk to fetch a specific account by ID
export const fetchAccountById = createAsyncThunk(
  "accounts/fetchAccountById",
  async (id) => {
    const response = await api.get(`/admin/users/${id}`);
    return response.data;
  }
);

// Async thunk to delete an account by ID
export const deleteAccountById = createAsyncThunk(
  "accounts/deleteAccountById",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/admin/users/${id}`);
      return id;
    } catch (err) {
      const apiMsg = err.response?.data?.message || err.response?.data?.error || err.message;
      return rejectWithValue(apiMsg);
    }
  }
);

// Async thunk to add a new account
export const addAccount = createAsyncThunk(
  "accounts/addAccount",
  async (accountData, { rejectWithValue }) => {
    try {
      const response = await api.post("/admin/users", accountData);
      return { ...response.data, key: response.data.userID };
    } catch (err) {
      const apiMsg = err.response?.data?.message || err.response?.data?.error || err.message;
      return rejectWithValue(apiMsg);
    }
  }
);

// Async thunk to update an account by ID
export const updateAccount = createAsyncThunk(
  "accounts/updateAccount",
  async ({ id, accountData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/admin/users/${id}`, accountData);
      return { ...response.data, key: response.data.userID };
    } catch (err) {
      const apiMsg = err.response?.data?.message || err.response?.data?.error || err.message;
      return rejectWithValue(apiMsg);
    }
  }
);

const accountSlice = createSlice({
  name: "account", // name of the slice state, put this name in the rootReducer, before the ":"
  initialState: {
    // state for account list
    data: [],
    loading: false,
    error: null,

    // state for a specific account object
    selectedAccount: null,
    selectedLoading: false,
    selectedError: null,
  },
  reducers: {},

  // reducers used by Async thunk
  extraReducers: (builder) => {
    builder
      // fetchAccounts
      .addCase(fetchAccounts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAccounts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAccounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
        toast.error(`Lỗi tải danh sách tài khoản: ${action.payload || action.error.message}`);
      })
      
      // fetchAccountById
      .addCase(fetchAccountById.pending, (state) => {
        state.selectedLoading = true;
        state.selectedError = null;
        state.selectedAccount = null;
      })
      .addCase(fetchAccountById.fulfilled, (state, action) => {
        state.selectedLoading = false;
        state.selectedAccount = action.payload;
      })
      .addCase(fetchAccountById.rejected, (state, action) => {
        state.selectedLoading = false;
        state.selectedError = action.payload || action.error.message;
        state.selectedAccount = null;
        toast.error(`Lỗi tải thông tin tài khoản: ${action.payload || action.error.message}`);
      })
      
      // deleteAccountById
      .addCase(deleteAccountById.pending, (state) => {
        state.selectedLoading = true;
        state.selectedError = null;
      })
      .addCase(deleteAccountById.fulfilled, (state, action) => {
        state.selectedLoading = false;
        // Remove deleted account from list if present
        state.data = state.data.filter(acc => acc.userID !== action.payload);
        // If the deleted account is the selected one, clear it
        if (state.selectedAccount && state.selectedAccount.userID === action.payload) {
          state.selectedAccount = null;
        }
      })
      .addCase(deleteAccountById.rejected, (state, action) => {
        state.selectedLoading = false;
        state.selectedError = action.payload || action.error.message;
        toast.error(`Xóa tài khoản thất bại: ${action.payload  || action.error.message}`);
      })
      
      // addAccount
      .addCase(addAccount.pending, (state) => {
        state.selectedLoading = true;
        state.selectedError = null;
      })
      .addCase(addAccount.fulfilled, (state, action) => {
        state.selectedLoading = false;
        // Add the new account to the list
        state.data.push(action.payload);
        // Select the new account
        state.selectedAccount = action.payload;
        toast.success("Tạo tài khoản thành công!")
      })
      .addCase(addAccount.rejected, (state, action) => {
        state.selectedLoading = false;
        state.selectedError = action.payload || action.error.message;
        toast.error(`Tạo tài khoản thất bại: ${action.payload || action.error.message}`);
      })
      // updateAccount
      .addCase(updateAccount.pending, (state) => {
        state.selectedLoading = true;
        state.selectedError = null;
      })
      .addCase(updateAccount.fulfilled, (state, action) => {
        state.selectedLoading = false;
        // Update the account in the list
        state.data = state.data.map(acc => acc.userID === action.payload.userID ? action.payload : acc);
        // Update selectedAccount if it's the same
        if (state.selectedAccount && state.selectedAccount.userID === action.payload.userID) {
          state.selectedAccount = action.payload;
        }
      })
      .addCase(updateAccount.rejected, (state, action) => {
        state.selectedLoading = false;
        state.selectedError = action.payload || action.error.message;
        toast.error(`Cập nhật tài khoản thất bại: ${action.payload || action.error.message}`);
      });
  },
});

export default accountSlice.reducer;