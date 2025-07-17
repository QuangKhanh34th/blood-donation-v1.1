// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "seventh-dynamo-465214-j3.firebaseapp.com",
  projectId: "seventh-dynamo-465214-j3",
  storageBucket: "seventh-dynamo-465214-j3.firebasestorage.app",
  messagingSenderId: "533180103702",
  appId: "1:533180103702:web:1202ad238580a83e878937",
  measurementId: "G-7ETMTJDFZV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { app, storage };