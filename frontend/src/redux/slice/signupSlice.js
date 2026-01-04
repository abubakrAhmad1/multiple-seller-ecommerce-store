import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

export const submitFormData = createAsyncThunk(
  "signUp/submitFormData",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post(`/${formData.type}/signUp`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone || '',
        shopName: formData.shopName || '',
      });
      const userData = response.data;
      localStorage.setItem('token', userData.token);
      localStorage.setItem('user', JSON.stringify(userData));
      return userData;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Signup failed');
    }
  }
);

const signupSlice = createSlice({
  name: "signup",
  initialState: {
    name: "",
    email: "",
    password: "",
    type: "",
    phone: "",
    shopName: "",
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    handleChange: (state, action) => {
      const { id, value } = action.payload;
      state[id] = value;
    },
    clear: (state) => {
      state.name = "";
      state.email = "";
      state.password = "";
      state.type = "";
      state.phone = "";
      state.shopName = "";
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitFormData.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(submitFormData.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(submitFormData.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const { handleChange, clear } = signupSlice.actions;
export default signupSlice.reducer;
