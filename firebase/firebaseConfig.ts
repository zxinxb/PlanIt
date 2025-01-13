// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBbjlMGr0Y0uaPx9de-Pb2J8BUGT3ii64I",
  authDomain: "planit-fa40c.firebaseapp.com",
  projectId: "planit-fa40c",
  storageBucket: "planit-fa40c.firebasestorage.app",
  messagingSenderId: "684868087064",
  appId: "1:684868087064:web:cb58b9b081f3db60cb426d",
  measurementId: "G-3Q6TFQPD4G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);