import { useDispatch, useSelector } from "react-redux";
import { removeSelectedProduct } from "../redux/slice/searchProductsSlice";

export default function Cart() {
  const products = useSelector(
    (state) => state.searchProducts.selectedProducts
  );
  const bill = useSelector(
    (state) => state.searchProducts.bill
  );
  const dispatch = useDispatch();
  return (
    <div>
      <ol>
        {products?.map((product) => (
          <div>
            <li>{product.title}</li>
            <button onClick={()=>dispatch(removeSelectedProduct(product.id))}>Remove Item</button>
          </div>
        ))}
      </ol>
      <h3>Total Bill : {bill}</h3>
    </div>
  );
}
