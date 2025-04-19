import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export default function AddProducts() {
  const sellerProducts = useSelector(
    (state) => state.addProducts.storedProducts
  );
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate("/addProductDiscription")}>
        Click To Add Product
      </button>
      {sellerProducts.map((product) => (
        <div>
          {/* DISPLAY ALL PRPODUCTS OF THE SELLER */}
          {product}
        </div>
      ))}
    </div>
  );
}
