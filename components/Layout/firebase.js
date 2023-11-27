// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBaRCHuc71qP_WtAPOT-Lyo45Y_6Eu_TOk",
  authDomain: "bookstore-online-5335a.firebaseapp.com",
  projectId: "bookstore-online-5335a",
  storageBucket: "bookstore-online-5335a.appspot.com",
  messagingSenderId: "998135104592",
  appId: "1:998135104592:web:074395b35dfa92d862fd55",
  measurementId: "G-J3BL1XT5GG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;