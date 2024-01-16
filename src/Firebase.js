// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "stayhub-18250.firebaseapp.com",
  projectId: "stayhub-18250",
  storageBucket: "stayhub-18250.appspot.com",
  messagingSenderId: "394575256583",
  appId: "1:394575256583:web:4d3dcdf07e9ff6fa6c5ea2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);