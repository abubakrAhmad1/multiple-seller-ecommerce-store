import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems } from "../redux/slice/searchProductsSlice";
import EachProduct from "./EachProduct";

export default function SearchProducts() {
  const dispatch = useDispatch();
  const { searchedItems } = useSelector((state) => state.searchProducts);
  const searchRef = useRef();

  return (
    <div>
      <input type="search" ref={searchRef} />
      <button onClick={() => dispatch(fetchItems(searchRef.current.value))}>
        Search
      </button>

      {searchedItems.length > 0 && (
        <ol>
          {searchedItems.map((item, index) => (
            //SHOW WHATEVER YOU WANT TO SHOW AS A SINGLE PRODUCT MAY BE AN OTHER COMPONENT LIKE <Product />
            // <li key={index}>{item.title}</li>
            <EachProduct item = {item}/>
          ))}
        </ol>
      )}
    </div>
  );
}
