import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchItems = createAsyncThunk(
  "searchProducts/fetchItems",
  async (searchTerm) => {
    //API calling here to get data according to the search terms
    const result = fetch("API").then(res => res.json());
    return result;
  }
);

const searchProductSlice = createSlice({
  name: "searchProducts",
  initialState: {
    searchedItems: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchItems.fulfilled, (state, action) => {
      state.searchedItems = action.payload;
    });
  },
});

export const {} = searchProductSlice.actions;
export default searchProductSlice.reducer;