import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems } from "../redux/slice/searchProductsSlice";
import EachProduct from "./EachProduct";
import { Link } from "react-router-dom";

export default function SearchProducts() {
  const dispatch = useDispatch();
  const searchedItems = useSelector(
    (state) => state.searchProducts.searchedItems
  );
  const searchRef = useRef();

  return (
    <div>
      <input type="search" ref={searchRef} />
      <button onClick={() => dispatch(fetchItems(searchRef.current.value))}>
        Search
      </button>
      <Link to="/cart">Cart</Link>

      {searchedItems.length > 0 && (
        <ol>
          {searchedItems.map((item, index) => (
            <EachProduct item={item} />
          ))}
        </ol>
      )}

    </div>
  );
}
