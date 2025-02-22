// firebase.ts
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signInAnonymously, 
  onAuthStateChanged 
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB9iceMf2OY-8JvxhnaadORuTxwSif4QY0",
    authDomain: "triviagame-54641.firebaseapp.com",
    projectId: "triviagame-54641",
    storageBucket: "triviagame-54641.firebasestorage.app",
    messagingSenderId: "683212111791",
    appId: "1:683212111791:web:5627e2681d4181c2eef95a"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get services
export const auth = getAuth(app);
export const db = getFirestore(app);

// Automatic anonymous sign-in
onAuthStateChanged(auth, (user) => {
  if (!user) {
    signInAnonymously(auth);
  }
});