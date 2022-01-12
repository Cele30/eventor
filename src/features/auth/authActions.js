import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { appLoaded } from "../../app/asyncSlice/asyncSlice";
import { signInUser, signOutUser } from "./authSlice";
import {
  getUserProfile,
  dataFromSnapshot,
} from "../../app/services/firebaseService";
import { onSnapshot } from "firebase/firestore";
import { listenToCurrentUserProfile } from "../profiles/profileSlice";

export const verifyAuth = () => {
  return dispatch => {
    const auth = getAuth();
    return onAuthStateChanged(auth, user => {
      if (user) {
        console.log(user);
        dispatch(
          signInUser({
            email: user.email,
            uid: user.uid,
            photoURL: user.photoURL,
            username: user.displayName,
            provider: user.providerData[0].providerId,
          })
        );
        const profileRef = getUserProfile(user.uid);
        onSnapshot(profileRef, snapshot => {
          dispatch(listenToCurrentUserProfile(dataFromSnapshot(snapshot)));
          dispatch(appLoaded());
        });
      } else {
        dispatch(signOutUser());
        dispatch(appLoaded());
      }
    });
  };
};
