import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
    'addProductsSlice' , async(sellerID) => {
        //fetch all added products of the seller from the DB
    }
);

export const postProduct = createAsyncThunk('addproductSlicePostProduct',
    async(data) => {
        //send all the products of the slice to the respective DB
        await axios.post(`http://localhost:8000/seller/product`,data);
    }
)

const addProductsSlice = createSlice({
    name: 'addProductSlice',
    initialState: {
        selectedImages :[],
        storedProducts : [],
        productDisc : {
            title :'',
            disc : '',
            qty : 0,
        },
    },
    reducers : {
        getImages : (state , action) =>{
            state.selectedImages = action.payload;
        },
        addDetails : (state, action) => {
            state.productDisc[action.payload.id] = action.payload.value;
        }

    },
    
});

export const {getImages}  = addProductsSlice.actions;
export default addProductsSlice.reducer;
