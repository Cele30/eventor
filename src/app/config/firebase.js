import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAELBzphaz30CWMNLyO9wIEmeR6Fs8J6bM",
  authDomain: "food-order-0530.firebaseapp.com",
  databaseURL: "https://food-order-0530-default-rtdb.firebaseio.com",
  projectId: "food-order-0530",
  storageBucket: "food-order-0530.appspot.com",
  messagingSenderId: "317867731518",
  appId: "1:317867731518:web:0c48fc7caff6c13497bf6f",
};

export const firebase = initializeApp(firebaseConfig);
