import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { appLoaded } from "../../app/asyncSlice/asyncSlice";
import { signInUser, signOutUser } from "./authSlice";

export const verifyAuth = () => {
  return dispatch => {
    const auth = getAuth();
    return onAuthStateChanged(auth, user => {
      if (user) {
        dispatch(signInUser(user.email));
        dispatch(appLoaded());
      } else {
        dispatch(signOutUser());
        dispatch(appLoaded());
      }
    });
  };
};
