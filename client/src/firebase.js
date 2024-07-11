// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern--blog-36108.firebaseapp.com",
  projectId: "mern--blog-36108",
  storageBucket: "mern--blog-36108.appspot.com",
  messagingSenderId: "39857081666",
  appId: "1:39857081666:web:59f755bfa858efadc50cdb"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

