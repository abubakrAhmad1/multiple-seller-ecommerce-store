import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const submitSignInData = createAsyncThunk("signin", async (data) => {
  const response = await ("API", {});
});

const signInSlice = createSlice({
  name: "signIn",
  initialState: {
    name: "",
    password: "",
    validateUser: false,
  },
  reducers: {
    handleChange: (state, action) => {
      state[action.payload.id] = action.payload.value;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(submitSignInData.fulfilled, (state, action) => {
      state.validateUser = true;
    });
  },
});

export const { handleChange } = signInSlice.actions;
export default signInSlice.reducer;
