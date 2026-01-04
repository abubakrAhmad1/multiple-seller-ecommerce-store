import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../components/Login";
import Signup from "../components/Signup";
import ProductList from "../components/ProductList";
import ProductDetail from "../components/ProductDetail";
import Cart from "../components/Cart";
import SellerDashboard from "../components/SellerDashboard";
import BuyerOrders from "../components/BuyerOrders";
import AddProduct from "../components/AddProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <ProductList /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "products", element: <ProductList /> },
      { path: "products/:id", element: <ProductDetail /> },
      { path: "cart", element: <Cart /> },
      { path: "orders", element: <BuyerOrders /> },
      { path: "seller/dashboard", element: <SellerDashboard /> },
      { path: "seller/products", element: <SellerDashboard /> },
      { path: "seller/products/add", element: <AddProduct /> },
      { path: "seller/products/edit/:id", element: <AddProduct /> },
      { path: "seller/orders", element: <SellerDashboard /> },
    ],
  },
]);

export default router;
