import { onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { asyncError, asyncFinish, asyncStart } from "../asyncSlice/asyncSlice";
import { dataFromSnapshot } from "../services/firebaseService";

export const useFirestoreCollection = ({ query, data, deps }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncStart());
    const unsubscribe = onSnapshot(
      query(),
      (snapshot) => {
        const docs = snapshot.docs.map((doc) => dataFromSnapshot(doc));
        data(docs);
        dispatch(asyncFinish());
      },
      (error) => dispatch(asyncError(error))
    );
    return () => unsubscribe();
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps
};
