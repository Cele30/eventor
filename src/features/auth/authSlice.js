import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    authenticated: false,
    currentUser: null,
  },
  reducers: {
    signInUser: (state, { payload }) => {
      state.authenticated = true;
      state.currentUser = payload;
    },
    signOutUser: state => {
      state.authenticated = false;
      state.currentUser = null;
    },
  },
});

export const { signOutUser, signInUser } = authSlice.actions;

export default authSlice.reducer;
