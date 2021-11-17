import { onSnapshot } from "@firebase/firestore";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { asyncError, asyncFinish, asyncStart } from "../asyncSlice/asyncSlice";
import { dataFromSnapshot } from "../services/firebaseService";

export const useFirestoreDoc = ({ query, data, deps }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncStart());
    const unsubscribe = onSnapshot(
      query,
      (snapshot) => {
        if (!snapshot._document) {
          dispatch(
            asyncError({
              code: "not_found",
              message: "Could not found document",
            })
          );
          return;
        }
        data(dataFromSnapshot(snapshot));
        dispatch(asyncFinish());
      },
      (error) => dispatch(asyncError(error))
    );
    return () => unsubscribe();
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps
};
