import { createSlice } from "@reduxjs/toolkit";

// Load user from localStorage on initialization
const loadUserFromStorage = () => {
  try {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      return {
        name: user.name || "",
        id: user._id || "",
        email: user.email || "",
        type: user.type || "",
        token: user.token || "",
      };
    }
  } catch (error) {
    console.error('Error loading user from storage:', error);
  }
  return {
    name: "",
    id: "",
    email: "",
    type: "",
    token: "",
  };
};

const loginUser = createSlice({
  name: "loginUser",
  initialState: loadUserFromStorage(),
  reducers: {
    setUser: (state, action) => {
      const user = action.payload;
      state.name = user.name || "";
      state.id = user._id || user.id || "";
      state.email = user.email || "";
      state.type = user.type || "";
      state.token = user.token || "";
    },
    clearUser: (state) => {
      state.name = "";
      state.id = "";
      state.email = "";
      state.type = "";
      state.token = "";
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
  },
});

export const { setUser, clearUser } = loginUser.actions;
export default loginUser.reducer;
