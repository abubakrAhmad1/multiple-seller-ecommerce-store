import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../../redux/slice/loginUser";
import { useEffect } from "react";

export default function AddProducts() {

  useEffect(()=>{
    getProducts();
  });
  const sellerProducts = useSelector(
    (state) => state.addProducts.storedProducts
  );
  const LoginUser = useSelector(state => state.loginUser);
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate("/addProductDiscription")}>
        Click To Add Product
      </button>
      {LoginUser.products.map((product) => (
        <div>
          {/* DISPLAY ALL PRPODUCTS OF THE SELLER */}
          {product.title}
        </div>
      ))}
    </div>
  );
}
