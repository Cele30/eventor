import { createSlice } from "@reduxjs/toolkit";

const textSlice = createSlice({
  name: "textSlice",
  initialState: {
    data: 42,
  },
  reducers: {
    increment: (state, action) => {
      state.data += action.payload;
    },
    decerment: (state, action) => {
      state.data -= action.payload;
    },
  },
});

export const { increment, decerment } = textSlice.actions;

export default textSlice.reducer;
