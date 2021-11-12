import { createSlice } from "@reduxjs/toolkit";

const asyncSlice = createSlice({
  name: "async",
  initialState: {
    loading: false,
    error: null,
  },
  reducers: {
    asyncStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    asyncFinish: (state) => {
      state.loading = false;
    },
    asyncError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { asyncStart, asyncFinish, asyncError } = asyncSlice.actions;

export default asyncSlice.reducer;
