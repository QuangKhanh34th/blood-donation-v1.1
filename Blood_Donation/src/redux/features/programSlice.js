import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../configs/axios";
import { toast } from "react-toastify";

// Async thunk to fetch programs from the API
export const fetchPrograms = createAsyncThunk(
  "programs/fetchPrograms",
  async () => {
    const response = await api.get("/programs");
    return response.data.map((program) => ({
      ...program,
      key: program.id, // TODO: update to correct id field
    }));
  }
);

// Async thunk to fetch slot details by IDs (used only in program context)
export const fetchSlotsByIds = createAsyncThunk(
  "programs/fetchSlotsByIds",
  async (slotIds) => {
    // slotIds: array of slotID
    const requests = slotIds.map(id => api.get(`/slots/${id}`));
    const responses = await Promise.all(requests);
    return responses.map(res => res.data);
  }
);

// Async thunk to fetch a specific program by ID
export const fetchProgramById = createAsyncThunk(
  "programs/fetchProgramById",
  async (id, { dispatch }) => {
    const response = await api.get(`/programs/${id}`);
    const program = response.data;
    let slots = [];
    if (program.slotIds && program.slotIds.length > 0) {
      slots = await dispatch(fetchSlotsByIds(program.slotIds)).unwrap();
    }
    return { ...program, slots };
  }
);

// Async thunk to delete a program by ID
export const deleteProgramById = createAsyncThunk(
  "programs/deleteProgramById",
  async (id, { rejectWithValue }) => {
    try {
      // TODO: Update endpoint
      await api.delete(`/programs/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Async thunk to add a new program
export const addProgram = createAsyncThunk(
  "programs/addProgram",
  async (programData, { rejectWithValue }) => {
    try {
      // TODO: Update endpoint
      const response = await api.post("/programs", programData);
      // Add a 'key' property for AntD Table
      return { ...response.data, key: response.data.id }; // TODO: update to correct id field
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Async thunk to add a new program
export const updateProgram = createAsyncThunk(
  "programs/updatetProgram",
  async ({id, ...programData}, { rejectWithValue }) => {
    try {
      // TODO: Update endpoint
      const response = await api.put(`/programs/${id}`, programData);
      // Add a 'key' property for AntD Table
      return { ...response.data, key: response.data.id }; // TODO: update to correct id field
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const programSlice = createSlice({
  name: "program", // name of the slice state
  initialState: {
    data: [],
    loading: false,
    error: null,
    selectedProgram: null,
    selectedLoading: false,
    selectedError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchPrograms
      .addCase(fetchPrograms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPrograms.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPrograms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
        toast.error(`Lỗi tải danh sách chương trình: ${action.payload || action.error.message}`);
      })
      // fetchProgramById
      .addCase(fetchProgramById.pending, (state) => {
        state.selectedLoading = true;
        state.selectedError = null;
        state.selectedProgram = null;
      })
      .addCase(fetchProgramById.fulfilled, (state, action) => {
        state.selectedLoading = false;
        state.selectedProgram = action.payload;
      })
      .addCase(fetchProgramById.rejected, (state, action) => {
        state.selectedLoading = false;
        state.selectedError = action.payload || action.error.message;
        state.selectedProgram = null;
        toast.error(`Lỗi tải thông tin chương trình: ${action.payload || action.error.message}`);
      })
      // deleteProgramById
      .addCase(deleteProgramById.pending, (state) => {
        state.selectedLoading = true;
        state.selectedError = null;
      })
      .addCase(deleteProgramById.fulfilled, (state, action) => {
        state.selectedLoading = false;
        state.data = state.data.filter(program => program.id !== action.payload); // TODO: update to correct id field
        if (state.selectedProgram && state.selectedProgram.id === action.payload) {
          state.selectedProgram = null;
        }
      })
      .addCase(deleteProgramById.rejected, (state, action) => {
        state.selectedLoading = false;
        state.selectedError = action.payload || action.error.message;
        toast.error(`Xóa chương trình thất bại: ${action.payload || action.error.message}`);
      })
      // addProgram
      .addCase(addProgram.pending, (state) => {
        state.selectedLoading = true;
        state.selectedError = null;
      })
      .addCase(addProgram.fulfilled, (state, action) => {
        state.selectedLoading = false;
        state.data.push(action.payload);
        state.selectedProgram = action.payload;
      })
      .addCase(addProgram.rejected, (state, action) => {
        state.selectedLoading = false;
        state.selectedError = action.payload || action.error.message;
        toast.error(`Tạo chương trình thất bại: ${action.payload || action.error.message}`);
      })
      // updateProgram
      .addCase(updateProgram.pending, (state) => {
        state.selectedLoading = true;
        state.selectedError = null;
      })
      .addCase(updateProgram.fulfilled, (state, action) => {
        state.selectedLoading = false;
        // Update the program in the data array
        const index = state.data.findIndex(program => program.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
        state.selectedProgram = action.payload;
        toast.success('Cập nhật chương trình thành công!');
      })
      .addCase(updateProgram.rejected, (state, action) => {
        state.selectedLoading = false;
        state.selectedError = action.payload || action.error.message;
        toast.error(`Cập nhật chương trình thất bại: ${action.payload || action.error.message}`);
      });
  },
});

export default programSlice.reducer;
