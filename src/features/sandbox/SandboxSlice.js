import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  asyncError,
  asyncFinish,
  asyncStart,
} from "../../app/asyncSlice/asyncSlice";
import { delay } from "../../app/common/util/util";

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
    incrementByAmount: (state, action) => {
      state.data += action.payload;
    },
  },
});

export const { increment, decerment, incrementByAmount } = textSlice.actions;

export const incrementAsync = (amount) => async (dispatch) => {
  dispatch(asyncStart());
  try {
    await delay(1000);
    // throw "oops";
    dispatch(incrementByAmount(amount));
    dispatch(asyncFinish());
  } catch (error) {
    dispatch(asyncError(error));
    toast.error(error);
  }
};

export default textSlice.reducer;
