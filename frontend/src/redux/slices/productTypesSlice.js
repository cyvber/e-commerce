import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_SERVER_URL;

export const fetchProductTypes = createAsyncThunk(
  'productTypes/fetchProductTypes',
  async () => {
    const response = await axios.get(`${BASE_URL}/products/types`);
    return response.data;
  }
);

const productTypesSlice = createSlice({
  name: 'productTypes',
  initialState: {
    data: {
      men: { clothing: [], accessories: [] },
      women: { clothing: [], accessories: [] }
    },
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductTypes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductTypes.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchProductTypes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default productTypesSlice.reducer;
