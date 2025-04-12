import { configureStore } from "@reduxjs/toolkit";
import signupReducer from "../slice/signupSlice";
import signinReducer from "../slice/signInSlice";

const store = configureStore({
  reducer: {
    signup: signupReducer,
    signin: signinReducer,
  },
});

export default store;
