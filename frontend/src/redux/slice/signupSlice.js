import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { signInWithGoogle } from '../../firebase';
import axios from 'axios';


export const googleSignUp = createAsyncThunk(
  'signup/googleSignUp',
  async () => {
    const response = await signInWithGoogle();
    return response.user;
  }
);

export const submitFormData = createAsyncThunk(
    "signUp/submitFormData",
    async (FormData)=> {
      console.log(FormData);
        const res = await axios.post(`http://localhost:8000/${FormData.type}/signUp`,FormData);
        console.log(res);
    }
);

const signupSlice = createSlice({
  name: 'signup',
  initialState: {
    name: '',
    email: '',
    password: '',
    type: '',
    googleData: null,
  },
  reducers: {
    handleChange: (state, action) => {
      const { id, value } = action.payload;
      state[id] = value;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(googleSignUp.fulfilled, (state, action) => {
      state.googleData = action.payload;
    });
  },
});

export const { handleChange } = signupSlice.actions;
export default signupSlice.reducer;
