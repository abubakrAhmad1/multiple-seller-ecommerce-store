import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const fetchItems = createAsyncThunk(
    'addProducts/fetchItems',
    async (searchTerm) => {

    }
)

const addProductSlice = createSlice({
    name : "addProducts",
    initialValue:{
        searchedItems : [],
    },
    reducers:{

    },
    extraReducers: (builder) => {

    }
});