import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    currentUserProfile: null,
    selectedUserProfile: null,
    photos: [],
    profileEvents: [],
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
    listenToUserEvents: (state, { payload }) => {
      state.profileEvents = payload;
    },
  },
});

export const {
  listenToCurrentUserProfile,
  listenToSelectedUserProfile,
  listenToUserPhotos,
  listenToUserEvents,
} = profileSlice.actions;

export default profileSlice.reducer;
