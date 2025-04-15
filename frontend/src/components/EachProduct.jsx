import { useDispatch } from "react-redux";
import { addSelectedProducts } from "../redux/slice/searchProductsSlice";

export default function EachProduct({item}) {
    const {title} = item;
    const dispatch = useDispatch();
    return(
        <div>
            <h2>{title}</h2>
            <button onClick={()=>dispatch(addSelectedProducts(item))}>Add To Cart</button>
        </div>
    );
}