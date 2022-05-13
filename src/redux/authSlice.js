import { createSlice } from "@reduxjs/toolkit";
export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    user: null,
    openAlertDialog: false,
    openUserDialog: false,
  },
  reducers: {
    login: (state) => {
      state.isAuthenticated = true;
    },
    logout: (state) => {
      localStorage.removeItem("token");
      state.isAuthenticated = false;
      state.user = null;
    },
    getUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    openAlertDialog: (state) => {
      state.openAlertDialog = true;
    },

    closeAlertDialog: (state) => {
      state.openAlertDialog = false;
    },
    openUserDialog: (state) => {
      state.openUserDialog = true;
    },
    closeUserDialog: (state) => {
      state.openUserDialog = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  login,
  logout,
  getUser,
  openAlertDialog,
  closeAlertDialog,
  openUserDialog,
  closeUserDialog,
} = authSlice.actions;

export default authSlice.reducer;
