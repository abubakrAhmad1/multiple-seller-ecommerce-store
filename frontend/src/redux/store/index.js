import { configureStore } from "@reduxjs/toolkit";
import signupReducer from "../slice/signupSlice";
import signinReducer from "../slice/signInSlice";
import productsReducer from '../slice/searchProductsSlice';
import cartReducer from '../slice/cartSlice';
import orderReducer from '../slice/orderSlice';
import myProductsReducer from '../slice/productSlice';
import loginUserReducer from '../slice/loginUser';

const store = configureStore({
  reducer: {
    signup: signupReducer,
    signin: signinReducer,
    products: productsReducer,
    cart: cartReducer,
    orders: orderReducer,
    myProducts: myProductsReducer,
    loginUser: loginUserReducer,
  },
});

export default store;
