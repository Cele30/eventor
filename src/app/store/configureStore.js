import { configureStore } from "@reduxjs/toolkit";
import testReducer from "../../features/sandbox/SandboxSlice";
import eventReducer from "../../features/events/eventSlice";

export const store = configureStore({
  reducer: {
    test: testReducer,
    event: eventReducer,
  },
});
