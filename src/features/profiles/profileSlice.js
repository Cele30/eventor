import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    currentUserProfile: null,
    selectedUserProfile: null,
  },
  reducers: {
    listenToCurrentUserProfile: (state, { payload }) => {
      state.currentUserProfile = payload;
    },
    listenToSelectedUserProfile: (state, { payload }) => {
      state.selectedUserProfile = payload;
    },
  },
});

export const { listenToCurrentUserProfile, listenToSelectedUserProfile } =
  profileSlice.actions;

export default profileSlice.reducer;
