import { configureStore } from "@reduxjs/toolkit";
import signupReducer from "../slice/signupSlice";
import signinReducer from "../slice/signInSlice";
import searchProductsReducer from '../slice/searchProductsSlice';

const store = configureStore({
  reducer: {
    signup: signupReducer,
    signin: signinReducer,
    searchProducts : searchProductsReducer,
  },
});

export default store;
