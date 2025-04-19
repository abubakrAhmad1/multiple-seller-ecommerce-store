import { configureStore } from "@reduxjs/toolkit";
import signupReducer from "../slice/signupSlice";
import signinReducer from "../slice/signInSlice";
import searchProductsReducer from '../slice/searchProductsSlice';
import addProductsReducer from '../slice/addProductsSlice';

const store = configureStore({
  reducer: {
    signup: signupReducer,
    signin: signinReducer,
    searchProducts : searchProductsReducer,
    addProducts : addProductsReducer,
  },
});

export default store;
