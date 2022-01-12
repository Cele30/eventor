import { configureStore } from "@reduxjs/toolkit";
import testReducer from "../../features/sandbox/SandboxSlice";
import eventReducer from "../../features/events/eventSlice";
import modalReducer from "../common/modal/modalSlice";
import authReducer from "../../features/auth/authSlice";
import asyncReducer from "../asyncSlice/asyncSlice";
import { verifyAuth } from "../../features/auth/authActions";
import profileReducer from "../../features/profiles/profileSlice";

const store = configureStore({
  reducer: {
    test: testReducer,
    event: eventReducer,
    modal: modalReducer,
    auth: authReducer,
    async: asyncReducer,
    profile: profileReducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: false,
  //   }),
});

store.dispatch(verifyAuth());

export { store };
