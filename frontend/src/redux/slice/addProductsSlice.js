import { createSlice } from "@reduxjs/toolkit";

const addProductsSlice = createSlice({
    name: 'addProductSlice',
    initialState: {
        selectedImages :[],
    },
    reducers : {
        getImages : (state , action) =>{
            state.selectedImages = action.payload;
        }
    },
});

export const {getImages}  = addProductsSlice.actions;
export default addProductsSlice.reducer;
