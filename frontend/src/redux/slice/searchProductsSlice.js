import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../utils/api";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (params = {}, { rejectWithValue }) => {
    try {
      const { search, category, minPrice, maxPrice, page = 1, sortBy = 'createdAt', sortOrder = 'desc' } = params;
      const queryParams = new URLSearchParams({
        page: page.toString(),
        ...(search && { search }),
        ...(category && { category }),
        ...(minPrice && { minPrice }),
        ...(maxPrice && { maxPrice }),
        sortBy,
        sortOrder,
      });
      const response = await api.get(`/products?${queryParams}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch products');
    }
  }
);

export const fetchProduct = createAsyncThunk(
  "products/fetchProduct",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch product');
    }
  }
);

export const fetchCategories = createAsyncThunk(
  "products/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/products/categories');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch categories');
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    currentProduct: null,
    categories: [],
    loading: false,
    error: null,
    currentPage: 1,
    totalPages: 1,
    totalProducts: 0,
    filters: {
      search: '',
      category: '',
      minPrice: '',
      maxPrice: '',
      sortBy: 'createdAt',
      sortOrder: 'desc',
    },
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        search: '',
        category: '',
        minPrice: '',
        maxPrice: '',
        sortBy: 'createdAt',
        sortOrder: 'desc',
      };
    },
    clearCurrentProduct: (state) => {
      state.currentProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        state.totalProducts = action.payload.totalProducts;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProduct = action.payload;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      });
  },
});

export const { setFilters, clearFilters, clearCurrentProduct } = productSlice.actions;
export default productSlice.reducer;
