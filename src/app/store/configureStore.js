import { configureStore } from "@reduxjs/toolkit";
import testReducer from "../../features/sandbox/SandboxSlice";
import eventReducer from "../../features/events/eventSlice";
import modalReducer from "../common/modal/modalSlice";
import authReducer from "../../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    test: testReducer,
    event: eventReducer,
    modal: modalReducer,
    auth: authReducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: false,
  //   }),
});
