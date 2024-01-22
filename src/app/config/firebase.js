
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_KEY,
  authDomain: "task-management-fd0b6.firebaseapp.com",
  projectId: "task-management-fd0b6",
  storageBucket: "task-management-fd0b6.appspot.com",
  messagingSenderId: "911145020601",
  appId: "1:911145020601:web:7e1d3241da8cac2ea13f68",
  measurementId: "G-QPYX30X02W"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const db = getFirestore(app);
export const storage = getStorage(app);
