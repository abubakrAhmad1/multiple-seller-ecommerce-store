import { useSelector } from "react-redux";

export default function Cart() {
  const products = useSelector(
    (state) => state.searchProducts.selectedProducts
  );
  return (
    <div>
      <ol>
        {products?.map((product) => (
          <li>{product.title}</li>
        ))}
      </ol>
    </div>
  );
}
