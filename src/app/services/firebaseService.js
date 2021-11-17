import { firebase } from "../config/firebase";
import { getFirestore, collection, Timestamp, doc } from "firebase/firestore";

const db = getFirestore(firebase);

export const dataFromSnapshot = (snapshot) => {
  console.log(snapshot);
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
  return collection(db, "events");
};

export const listenToEventFromFirestore = (eventId) => {
  const eventsRef = collection(db, "events");
  return doc(eventsRef, eventId);
};
