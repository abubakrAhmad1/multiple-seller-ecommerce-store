import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const fetchProducts = createAsyncThunk(
    'addProductsSlice' , async(sellerID) => {
        //fetch all added products of the seller from the DB
    }
);

export const postProduct = createAsyncThunk('addproductSlicePostProduct',
    async(_, ThunkAPI) => {
        const state = ThunkAPI.getState();
        const {productDisc}  = state;
        //send all the products of the slice to the respective DB
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
