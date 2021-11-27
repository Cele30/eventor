import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { signInUser, signOutUser } from "./authSlice";

export const verifyAuth = () => {
  return (dispatch) => {
    const auth = getAuth();
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(signInUser(user.email));
      } else {
        dispatch(signOutUser());
      }
    });
  };
};
