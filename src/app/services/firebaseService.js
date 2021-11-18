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
} from "firebase/firestore";
import cuid from "cuid";

const db = getFirestore(firebase);

export const dataFromSnapshot = (snapshot) => {
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

export const listenToEventFromFirestore = (eventId) => {
  const eventsRef = collection(db, "events");
  return doc(eventsRef, eventId);
};

export const addEventToFirestore = (event) => {
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

export const updateEventInFirestore = (event) => {
  return updateDoc(doc(db, "events", event.id), event);
};

export const deleteEventInFirestore = (eventId) => {
  return deleteDoc(doc(db, "events", eventId));
};

export const cancelEventToggle = (event) => {
  return updateDoc(doc(db, "events", event.id), {
    isCancelled: !event.isCancelled,
  });
};
