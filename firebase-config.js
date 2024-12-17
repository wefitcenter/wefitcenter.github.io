// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKuTzQGELYyU7dqwC8AKVn3RxycSusY8g",
  authDomain: "delta-forest.firebaseapp.com",
  databaseURL: "https://delta-forest-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "delta-forest",
  storageBucket: "delta-forest.firebasestorage.app",
  messagingSenderId: "204701067028",
  appId: "1:204701067028:web:c7db47d92f679a33b24401",
  measurementId: "G-Y4P9SL76ZZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase modules
export const auth = getAuth(app); // För autentisering
export const database = getDatabase(app); // För Realtime Database
