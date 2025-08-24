// src/features/blog/blogSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Initial state
const initialState = {
  posts: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// ------------------- THUNKS ------------------- //

// Fetch all posts
export const fetchPosts = createAsyncThunk('blog/fetchPosts', async () => {
  const response = await axios.get('http://localhost:5000/api/posts');
  return response.data;
});

// Create a new post
export const createPost = createAsyncThunk('blog/createPost', async (postData) => {
  const response = await axios.post('http://localhost:5000/api/posts', postData);
  return response.data;
});

// Update a post
export const updatePost = createAsyncThunk(
  'blog/updatePost',
  async ({ id, title, content }) => {
    const response = await axios.put(`http://localhost:5000/api/posts/${id}`, { title, content });
    return response.data;
  }
);

// Delete a post
export const deletePost = createAsyncThunk(
  'blog/deletePost',
  async (id) => {
    await axios.delete(`http://localhost:5000/api/posts/${id}`);
    return id; // return deleted post id
  }
);

// ------------------- SLICE ------------------- //
const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
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
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
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

// ------------------- EXPORTS ------------------- //
export default blogSlice.reducer;
