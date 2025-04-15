import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchItems = createAsyncThunk(
  "searchProducts/fetchItems",
  async (searchTerm) => {
    //API calling here to get data according to the search terms
    const result = await fetch("https://fakestoreapi.com/products").then(
      (res) => res.json()
    );
    if (searchTerm === null) {
      return result;
    } else {
      return result.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  }
);

const searchProductSlice = createSlice({
  name: "searchProducts",
  initialState: {
    searchedItems: [],
    selectedProducts: [],
    bill: 0,
  },
  reducers: {
    addSelectedProducts: (state, action) => {
      state.selectedProducts.push(action.payload);
      state.bill = state.selectedProducts.reduce(
        (acc, product) => acc + Number(product.price),
        0
      );

    },
    removeSelectedProduct: (state, action) => {
      state.selectedProducts = state.selectedProducts.filter(
        (product) => product.id !== action.payload
      );
      state.bill = state.selectedProducts.reduce(
        (acc, product) => acc + Number(product.price),
        0
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchItems.fulfilled, (state, action) => {
      state.searchedItems = action.payload;
    });
  },
});

export const { addSelectedProducts, removeSelectedProduct } =
  searchProductSlice.actions;
export default searchProductSlice.reducer;
