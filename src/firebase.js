// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAEHoytVHs1u_MxlIukHsPva8yj1WNGfb8",
  authDomain: "appsmith-solutions.firebaseapp.com",
  projectId: "appsmith-solutions",
  storageBucket: "appsmith-solutions.firebasestorage.app",
  messagingSenderId: "382291369381",
  appId: "1:382291369381:web:7cfda3af447113cb3cdc4c",
  measurementId: "G-7QGF395Z8M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export {app,db,auth};