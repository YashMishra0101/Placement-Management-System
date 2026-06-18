import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import { 
  getFirestore, 
  collection, 
  addDoc, 
  doc, 
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  serverTimestamp,
  onSnapshot,
  
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_Firebase_API_KEY,
authDomain: "placement-management-sys-c667c.firebaseapp.com",
  projectId: "placement-management-sys-c667c",
  storageBucket: "placement-management-sys-c667c.firebasestorage.app",
  messagingSenderId: "323399413626",
  appId: "1:323399413626:web:521237adafd2a53918b0c3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { 
  auth, 
  db, 
  createUserWithEmailAndPassword, 
  addDoc, 
  collection,
  doc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  serverTimestamp,
  onSnapshot,
};