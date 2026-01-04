import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../utils/api";

export const submitSignInData = createAsyncThunk(
  "signin",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post(`/${data.type}/signIn`, {
        email: data.email,
        password: data.password,
      });
      const userData = response.data;
      localStorage.setItem('token', userData.token);
      localStorage.setItem('user', JSON.stringify(userData));
      return userData;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

const signInSlice = createSlice({
  name: "signIn",
  initialState: {
    email: "",
    password: "",
    validateUser: false,
    type: "",
    loading: false,
    error: null,
  },
  reducers: {
    handleChange: (state, action) => {
      state[action.payload.id] = action.payload.value;
    },
    clear: (state) => {
      state.email = "";
      state.password = "";
      state.type = "";
      state.error = null;
    },
    logout: (state) => {
      state.validateUser = false;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitSignInData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitSignInData.fulfilled, (state, action) => {
        state.loading = false;
        state.validateUser = true;
        state.error = null;
      })
      .addCase(submitSignInData.rejected, (state, action) => {
        state.loading = false;
        state.validateUser = false;
        state.error = action.payload;
      });
  },
});

export const { handleChange, clear, logout } = signInSlice.actions;
export default signInSlice.reducer;
