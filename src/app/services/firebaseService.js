import { firebase } from "../config/firebase";
import {
  getFirestore,
  collection,
  Timestamp,
  doc,
  addDoc,
  arrayUnion,
  arrayRemove,
  updateDoc,
  orderBy,
  query,
  deleteDoc,
  setDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
  updatePassword,
} from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";

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
  const user = getAuth().currentUser;

  return addDoc(collection(db, "events"), {
    ...event,
    hostUid: user.uid,
    hostedBy: user.displayName,
    hostPhotoURL: user.photoURL || null,
    attendees: arrayUnion({
      id: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL || null,
    }),
    attendeeIds: arrayUnion(user.uid),
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

export const uploadToFirebaseStorage = (file, filename) => {
  const auth = getAuth();
  const storage = getStorage();

  const storageRef = ref(
    storage,
    `${auth.currentUser.uid}/user_images/${filename}`
  );

  return uploadBytesResumable(storageRef, file);
};

export const updateUserProfilePhoto = async (downloadURL, filename) => {
  const user = getAuth().currentUser;
  const userDocRef = doc(db, "users", user.uid);

  try {
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.data().photoURL) {
      await updateDoc(userDocRef, {
        photoURL: downloadURL,
      });
      await updateProfile(user, {
        photoURL: downloadURL,
      });
    }

    return await addDoc(collection(userDocRef, "photos"), {
      name: filename,
      url: downloadURL,
    });
  } catch (error) {
    throw error;
  }
};

export const getUserPhotos = userUid => {
  return query(collection(doc(db, "users", userUid), "photos"));
};

export const setMainPhoto = async photo => {
  const user = getAuth().currentUser;

  try {
    await updateDoc(doc(db, "users", user.uid), {
      photoURL: photo.url,
    });
    return await updateProfile(user, { photoURL: photo.url });
  } catch (error) {
    throw error;
  }
};

export const deleteFromFirebaseStorage = filename => {
  const user = getAuth().currentUser;
  const storageRef = getStorage();

  const photoRef = ref(storageRef, `${user.uid}/user_images/${filename}`);

  return deleteObject(photoRef);
};

export const deletePhotoFromCollection = photoId => {
  const user = getAuth().currentUser;

  return deleteDoc(doc(db, `users/${user.uid}/photos`, photoId));
};

export const addUserAttendance = event => {
  const user = getAuth().currentUser;

  return updateDoc(doc(db, "events", event.id), {
    attendees: arrayUnion({
      id: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL || null,
    }),
    attendeeIds: arrayUnion(user.uid),
  });
};

export const cancelUserAttendance = async event => {
  const user = getAuth().currentUser;

  try {
    const eventDoc = await getDoc(doc(db, "events", event.id));

    return updateDoc(doc(db, "events", event.id), {
      attendeeIds: arrayRemove(user.uid),
      attendees: eventDoc
        .data()
        .attendees.filter(attendee => attendee.id !== user.uid),
    });
  } catch (error) {
    throw error;
  }
};
