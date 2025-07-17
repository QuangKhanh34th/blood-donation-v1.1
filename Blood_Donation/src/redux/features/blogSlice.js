import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../configs/axios";
import { toast } from "react-toastify";

// CREATE blog
export const createBlog = createAsyncThunk("blog/create", async (blogData, { rejectWithValue }) => {
  try {
    const res = await api.post("/blogs", blogData); 
    toast.success("Tạo blog thành công!");
    return res.data;
  } catch (err) {
    toast.error("Tạo blog thất bại!");
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

// FETCH all blogs
export const fetchBlogs = createAsyncThunk("blog/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const res = await api.get("/blogs");
    return res.data.map((b) => ({
      contId: b.contId,
      contTitle: b.contTitle,
      contBody: b.contBody,
      contType: b.contType,
      conPubDate: b.conPubDate,
      staffName: b.staff?.fullName || "Không rõ",
    }));
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

// Add these in blogSlice.js
export const deleteBlog = createAsyncThunk("blog/delete", async (id, { rejectWithValue }) => {
  try {
    await api.delete(`/blogs/${id}`);
    toast.success("Xóa blog thành công!");
    return id;
  } catch (err) {
    toast.error("Xóa blog thất bại!");
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const updateBlog = createAsyncThunk("blog/update", async ({ id, blogData }, { rejectWithValue }) => {
  try {
    const res = await api.put(`/blogs/${id}`, blogData);
    toast.success("Cập nhật blog thành công!");
    return res.data;
  } catch (err) {
    toast.error("Cập nhật blog thất bại!");
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});


const blogSlice = createSlice({
  name: "blog",
  initialState: {
    list: [],
    loading: false,
    error: null,
    createLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createBlog.pending, (state) => {
        state.createLoading = true;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.createLoading = false;
        state.list.unshift(action.payload);
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.createLoading = false;
        state.error = action.payload;
      })
        .addCase(deleteBlog.fulfilled, (state, action) => {
            state.list = state.list.filter((b) => b.contId !== action.payload);
        })
        .addCase(updateBlog.fulfilled, (state, action) => {
            const index = state.list.findIndex((b) => b.contId === action.payload.contId);
            if (index !== -1) state.list[index] = action.payload;
        })
  },
});

export default blogSlice.reducer;
