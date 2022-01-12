import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    currentUserProfile: null,
    selectedUserProfile: null,
    photos: [],
  },
  reducers: {
    listenToCurrentUserProfile: (state, { payload }) => {
      state.currentUserProfile = payload;
    },
    listenToSelectedUserProfile: (state, { payload }) => {
      state.selectedUserProfile = payload;
    },
    listenToUserPhotos: (state, { payload }) => {
      state.photos = payload;
    },
  },
});

export const {
  listenToCurrentUserProfile,
  listenToSelectedUserProfile,
  listenToUserPhotos,
} = profileSlice.actions;

export default profileSlice.reducer;
