import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../utils/api";

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('title', productData.title);
      formData.append('description', productData.description);
      formData.append('price', productData.price);
      formData.append('quantity', productData.quantity);
      formData.append('category', productData.category);
      
      if (productData.images && productData.images.length > 0) {
        productData.images.forEach((image) => {
          formData.append('images', image);
        });
      }

      const response = await api.post('/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create product');
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, productData }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      if (productData.title) formData.append('title', productData.title);
      if (productData.description) formData.append('description', productData.description);
      if (productData.price) formData.append('price', productData.price);
      if (productData.quantity !== undefined) formData.append('quantity', productData.quantity);
      if (productData.category) formData.append('category', productData.category);
      if (productData.status) formData.append('status', productData.status);
      
      if (productData.images && productData.images.length > 0) {
        productData.images.forEach((image) => {
          formData.append('images', image);
        });
      }

      const response = await api.put(`/products/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update product');
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/products/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete product');
    }
  }
);

export const fetchMyProducts = createAsyncThunk(
  "products/fetchMyProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/products/my-products');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch products');
    }
  }
);

export const addReview = createAsyncThunk(
  "products/addReview",
  async ({ productId, rating, comment }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/products/${productId}/reviews`, {
        rating,
        comment,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add review');
    }
  }
);

const myProductSlice = createSlice({
  name: "myProducts",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.unshift(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(p => p._id === action.payload._id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(p => p._id !== action.payload);
      })
      .addCase(fetchMyProducts.fulfilled, (state, action) => {
        state.products = action.payload;
      });
  },
});

export const { clearError } = myProductSlice.actions;
export default myProductSlice.reducer;

