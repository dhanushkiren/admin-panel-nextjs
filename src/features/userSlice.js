// File: src/features/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../lib/api';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async (page = 1) => {
  const res = await api.get(`/users?page=${page}`,{
    headers: {
      'x-api-key': 'reqres-free-v1'
    }
  });
  return res.data.data;
});

const userSlice = createSlice({
  name: 'users',
  initialState: { list: [], loading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;