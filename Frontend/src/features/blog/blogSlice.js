// src/features/blog/blogSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  posts: [],
  status: 'idle',
  error: null,
};

// Fetch all posts
export const fetchPosts = createAsyncThunk('blog/fetchPosts', async () => {
  const response = await axios.get('http://localhost:5000/api/posts', {
    withCredentials: true,
  });
  return response.data;
});

// Create a new post
export const createPost = createAsyncThunk(
  'blog/createPost',
  async (postData, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:5000/api/posts', postData, {
        withCredentials: true,  // Important for sending auth cookies!
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.error || 'Failed to create post');
    }
  }
);

// Update a post
export const updatePost = createAsyncThunk(
  'blog/updatePost',
  async ({ id, title, content }) => {
    const response = await axios.put(`http://localhost:5000/api/posts/${id}`, { title, content }, {
      withCredentials: true,
    });
    return response.data;
  }
);

// Delete a post
export const deletePost = createAsyncThunk(
  'blog/deletePost',
  async (id) => {
    await axios.delete(`http://localhost:5000/api/posts/${id}`, {
      withCredentials: true,
    });
    return id;
  }
);

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // CREATE
      .addCase(createPost.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts.push(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })

      // UPDATE
      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.posts.findIndex(
          (p) => (p._id || p.id) === (action.payload._id || action.payload.id)
        );
        if (index !== -1) state.posts[index] = action.payload;
      })

      // DELETE
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter(
          (p) => (p._id || p.id) !== action.payload
        );
      });
  },
});

export default blogSlice.reducer;
