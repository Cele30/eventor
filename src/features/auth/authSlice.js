import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    authenticated: true,
    currentUser: {
      email: "test@test.com",
    },
  },
  reducers: {
    signInUser: (state, action) => {
      state.authenticated = true;
      state.currentUser = {
        email: action.payload.email,
        photoURL: "/assets/user.png",
      };
    },
    signOutUser: (state) => {
      state.authenticated = false;
      state.currentUser = null;
    },
  },
});

export const { signInUser, signOutUser } = authSlice.actions;

export default authSlice.reducer;
