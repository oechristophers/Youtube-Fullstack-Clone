// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {GoogleAuthProvider, getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNWCElLYi1BWgSGcZS5lFxs9IGdqrCyak",
  authDomain: "video-892c6.firebaseapp.com",
  projectId: "video-892c6",
  storageBucket: "video-892c6.appspot.com",
  messagingSenderId: "355623722190",
  appId: "1:355623722190:web:353c5f65e73e842400849f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const provider = new GoogleAuthProvider();
export default app;