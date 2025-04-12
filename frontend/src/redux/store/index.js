import { configureStore } from "@reduxjs/toolkit";
import signupReducer from '../slice/signupSlice';

const store = configureStore({
    reducer : {
        signup : signupReducer,
    }
});

export default store;