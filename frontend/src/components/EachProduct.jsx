import { useDispatch, useSelector } from "react-redux";
import { addSelectedProducts } from "../redux/slice/searchProductsSlice";

export default function EachProduct(props) {
    const {title} = props.item;
    const dispatch = useDispatch();
    return(
        <div>
            <h2>{title}</h2>
            <button onClick={()=>dispatch(addSelectedProducts(props.item))}>Add To Cart</button>
        </div>
    );
}