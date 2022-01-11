import { createSlice } from "@reduxjs/toolkit";

const asyncSlice = createSlice({
  name: "async",
  initialState: {
    loading: false,
    error: null,
    initialized: false,
  },
  reducers: {
    asyncStart: state => {
      state.loading = true;
      state.error = null;
    },
    asyncFinish: state => {
      state.loading = false;
    },
    asyncError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    appLoaded: state => {
      state.initialized = true;
    },
  },
});

export const { asyncStart, asyncFinish, asyncError, appLoaded } =
  asyncSlice.actions;

export default asyncSlice.reducer;
