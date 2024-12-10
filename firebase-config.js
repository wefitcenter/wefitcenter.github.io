// Firebase-konfiguration
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "DIN_API_KEY",
  authDomain: "DIN_AUTH_DOMAIN",
  databaseURL: "DIN_DATABASE_URL",
  projectId: "DIN_PROJECT_ID",
  storageBucket: "DIN_STORAGE_BUCKET",
  messagingSenderId: "DIN_MESSAGING_SENDER_ID",
  appId: "DIN_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
