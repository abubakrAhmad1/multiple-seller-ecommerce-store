import { configureStore } from "@reduxjs/toolkit";
import signupReducer from "../slice/signupSlice";
import signinReducer from "../slice/signInSlice";
import searchProductsReducer from '../slice/searchProductsSlice';
import addProductsReducer from '../slice/addProductsSlice';
import LoginUserReducer from '../slice/loginUser';

const store = configureStore({
  reducer: {
    signup: signupReducer,
    signin: signinReducer,
    searchProducts : searchProductsReducer,
    addProducts : addProductsReducer,
    loginUser : LoginUserReducer,
  },
});

export default store;
