import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
const API_KEY = import.meta.env.VITE_Firebase_API_KEY;

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "placement-portal-d8843.firebaseapp.com",
  projectId: "placement-portal-d8843",
  storageBucket: "placement-portal-d8843.firebasestorage.app",
  messagingSenderId: "142133720679",
  appId: "1:142133720679:web:15cbe2d04ffd46cecd06c2",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const fireDb = getFirestore(app);
export { auth, fireDb };

export { auth, db, createUserWithEmailAndPassword, addDoc, collection };
