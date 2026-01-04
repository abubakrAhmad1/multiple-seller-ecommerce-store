import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../utils/api";

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/buyer/cart');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch cart');
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, quantity = 1 }, { rejectWithValue }) => {
    try {
      const response = await api.post('/buyer/cart', { productId, quantity });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add to cart');
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/buyer/cart/${productId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to remove from cart');
    }
  }
);

export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/buyer/cart/${productId}`, { quantity });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update cart');
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearCart: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.items = action.payload;
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;

