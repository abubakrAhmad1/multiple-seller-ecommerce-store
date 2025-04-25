import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const submitSignInData = createAsyncThunk("signin", async (data) => {
  const user = await axios.post(
    `http://localhost:8000/${data.type}/signIn`,
    data
  );
  if (user !== null) {
    // console.log("User Found..!!",user);
    return user;
  }
});

const signInSlice = createSlice({
  name: "signIn",
  initialState: {
    name: "",
    password: "",
    validateUser: false,
    type: "",
  },
  reducers: {
    handleChange: (state, action) => {
      state[action.payload.id] = action.payload.value;
    },
    clear : (state,action) => {
      state.name ="";
      state.password = "";
      state.type ="";
    }
  },
  extraReducers: (builder) => {
    builder.addCase(submitSignInData.fulfilled, (state, action) => {
      state.validateUser = true;
    });
  },
});

export const { handleChange } = signInSlice.actions;
export default signInSlice.reducer;
