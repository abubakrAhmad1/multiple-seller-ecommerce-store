import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getProducts = createAsyncThunk("loginUserSlice", async (ThunkAPI) => {
  const state = ThunkAPI.getState();
  const{products} =state;
   const latestProducts = await axios.get( `http://localhost:8000/seller/products`);
   return latestProducts;
});

const loginUser = createSlice({
  name: "loginUser",
  initialState: {
    name: "",
    id: "",
    type: "",
    images: [],
    products : []
  },
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.name || "";
      state.id = action.payload.id || "";
      state.type = action.payload.type || "";
      state.images = action.payload.images ? [...action.payload.images] : [];
    },
    addProduct: (state, action) => {},
  },
  extraReducers : (builder) => {
    builder.addCase(getProducts.fulfilled , (state,action)=>{
      state.products = action.payload;
    })
  }
});

export const { setUser } = loginUser.actions;
export default loginUser.reducer;
