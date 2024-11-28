// Import required Firebase functions
import { initializeApp, FirebaseApp } from "firebase/app";
import { getAnalytics, Analytics } from "firebase/analytics";
import { getFirestore, Firestore } from "firebase/firestore";

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyA3UAlA7jrINvWVDDGBhbTb6bGvIkAopLE",
  authDomain: "website-13ee7.firebaseapp.com",
  projectId: "website-13ee7",
  storageBucket: "website-13ee7.firebasestorage.app",
  messagingSenderId: "35684678466",
  appId: "1:35684678466:web:bea23a0a9a4b5f0205e6db",
  measurementId: "G-7YF818WJ8C",
};

// Initialize Firebase app
const app: FirebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase services
let analytics: Analytics | undefined;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app); // Analytics can only be used in browser
}

const db: Firestore = getFirestore(app);

export { app, analytics, db };
