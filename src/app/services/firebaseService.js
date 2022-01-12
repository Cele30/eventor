import { firebase } from "../config/firebase";
import {
  getFirestore,
  collection,
  Timestamp,
  doc,
  addDoc,
  arrayUnion,
  updateDoc,
  orderBy,
  query,
  deleteDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
  updatePassword,
} from "firebase/auth";
import cuid from "cuid";

const db = getFirestore(firebase);
const auth = getAuth();

export const dataFromSnapshot = snapshot => {
  if (!snapshot.exists) return undefined;

  const data = snapshot.data();
  for (const prop in data) {
    if (data.hasOwnProperty(prop)) {
      if (data[prop] instanceof Timestamp) {
        data[prop] = data[prop].toDate().toString();
      }
    }
  }

  return {
    ...data,
    id: snapshot.id,
  };
};

export const listenToEventsFromFirestore = () => {
  const eventsRef = collection(db, "events");
  return query(eventsRef, orderBy("date"));
};

export const listenToEventFromFirestore = eventId => {
  const eventsRef = collection(db, "events");
  return doc(eventsRef, eventId);
};

export const addEventToFirestore = event => {
  return addDoc(collection(db, "events"), {
    ...event,
    hostedBy: "Diana",
    hostPhotoURL: "https://randomuser.me/api/portraits/women/20.jpg",
    attendees: arrayUnion({
      id: cuid(),
      displayName: "Diana",
      photoURL: "https://randomuser.me/api/portraits/women/20.jpg",
    }),
  });
};

export const updateEventInFirestore = event => {
  return updateDoc(doc(db, "events", event.id), event);
};

export const deleteEventInFirestore = eventId => {
  return deleteDoc(doc(db, "events", eventId));
};

export const cancelEventToggle = event => {
  return updateDoc(doc(db, "events", event.id), {
    isCancelled: !event.isCancelled,
  });
};

export const signInWithEmail = creds => {
  return signInWithEmailAndPassword(auth, creds.email, creds.password);
};

export const signOutFromFirebase = () => {
  return signOut(auth);
};

export const registerInFirebase = async creds => {
  try {
    const result = await createUserWithEmailAndPassword(
      auth,
      creds.email,
      creds.password
    );

    await updateProfile(result.user, {
      displayName: creds.username,
    });

    return await setUserProfileData(result.user);
  } catch (error) {
    throw error;
  }
};

export const setUserProfileData = user => {
  const userRef = doc(db, "users", user.uid);

  setDoc(
    userRef,
    {
      username: user.displayName,
      email: user.email,
      createdAt: serverTimestamp(),
    },
    { merge: true }
  );
};

export const updateUserPassword = creds => {
  const user = getAuth().currentUser;
  return updatePassword(user, creds.newPassword1);
};

export const getUserProfile = userId => {
  const usersRef = collection(db, "users");
  return doc(usersRef, userId);
};

export const updateUserProfile = async profile => {
  const auth = getAuth();

  try {
    if (auth.currentUser.displayName !== profile.username) {
      await updateProfile(auth.currentUser, {
        displayName: profile.username,
      });
    }
    return await updateDoc(doc(db, "users", auth.currentUser.uid), profile);
  } catch (error) {
    throw error;
  }
};
