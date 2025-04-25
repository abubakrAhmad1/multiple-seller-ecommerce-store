import { createSlice } from "@reduxjs/toolkit";

const loginUser = createSlice({
  name: "loginUser",
  initialState: {
    name: "",
    id: "",
    type: "",
    images: [],
  },
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.name || "";
      state.id = action.payload.id || "";
      state.type = action.payload.type || "";
      state.images = action.payload.images ? [...action.payload.images] : [];
    },
    addProduct : (state, action) => {
      
    }
  },
});

export const { setUser } = loginUser.actions;
export default loginUser.reducer;
