// src/router.js
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../components/Login";
import Signup from "../components/Signup";
import SearchProducts from "../components/SearchProducts";
import Cart from "../components/Cart";
import AddProducts from "../components/AddProducts";
import ProductDiscription from "../components/AddProducts/ProductDiscription";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/searchProducts", element: <SearchProducts /> },
      { path: "/cart", element: <Cart /> },
      { path: "/addProducts", element: <AddProducts /> },
      { path: "/addProductDiscription", element: <ProductDiscription /> },
    ],
  },
]);

export default router;
