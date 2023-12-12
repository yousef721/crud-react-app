import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.get(
        "https://react-crud-app-server.vercel.app/posts"
      );
      return [...res.data];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const fetchPost = createAsyncThunk(
  "posts/fetchPost",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.get(
        `https://react-crud-app-server.vercel.app/posts/${id}`
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      await axios.delete(
        `https://react-crud-app-server.vercel.app/posts/${id}`
      );
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const insertPost = createAsyncThunk(
  "posts/insertPost",
  async (item, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const { authSlice } = getState();
    item.userId = authSlice.id;

    try {
      const res = await axios.post(
        "https://react-crud-app-server.vercel.app/posts",
        JSON.stringify(item),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editPost = createAsyncThunk(
  "posts/editPost",
  async (item, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.patch(
        `https://react-crud-app-server.vercel.app/posts/${item.id}`,
        JSON.stringify(item),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  record: [],
  loading: false,
  error: null,
  recordDetails: {},
};
const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    cleanRecord: (state) => {
      state.recordDetails = {};
    },
  },
  extraReducers: (builder) => {
    // Get Posts
    builder.addCase(fetchPosts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.record = action.payload;
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.loading = false;
      state.record = action.payload;
    });
    // Get Post
    builder.addCase(fetchPost.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPost.fulfilled, (state, action) => {
      state.loading = false;
      state.recordDetails = action.payload;
    });
    builder.addCase(fetchPost.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    // Insert Post
    builder.addCase(insertPost.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(insertPost.fulfilled, (state, action) => {
      state.loading = false;
      state.record.push(action.payload);
    });
    builder.addCase(insertPost.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    // Edit Post
    builder.addCase(editPost.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(editPost.fulfilled, (state, action) => {
      state.loading = false;
      state.recordDetails = action.payload;
    });
    builder.addCase(editPost.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    // Delete Post
    builder.addCase(deletePost.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.loading = false;
      state.record = state.record.filter((el) => el.id !== action.payload);
    });
    builder.addCase(deletePost.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default postSlice.reducer;
