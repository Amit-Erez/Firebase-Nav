// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfmsSiIrlSwAFQX0TSKqHdEZxPX8Bok7A",
  authDomain: "fir-practice-74f5d.firebaseapp.com",
  projectId: "fir-practice-74f5d",
  storageBucket: "fir-practice-74f5d.firebasestorage.app",
  messagingSenderId: "23635053864",
  appId: "1:23635053864:web:7465a780f2588d3656941d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();