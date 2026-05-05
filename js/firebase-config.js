// Firebase Configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyApbDOnpHQXQj34I1oNYcZ09BXpAXUjxIE",
  authDomain: "social-manager-63939.firebaseapp.com",
  databaseURL: "https://social-manager-63939-default-rtdb.firebaseio.com",
  projectId: "social-manager-63939",
  storageBucket: "social-manager-63939.firebasestorage.app",
  messagingSenderId: "480147800507",
  appId: "1:480147800507:web:3a8c96aff9af2d4906849e",
  measurementId: "G-T6F5JSY53P"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
