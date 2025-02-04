// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBVKUJZcscPTRQs6Tb9-vBZyBDGlu48Oqo",
    authDomain: "weather-app-54854.firebaseapp.com",
    projectId: "weather-app-54854",
    storageBucket: "weather-app-54854.firebasestorage.app",
    messagingSenderId: "1061945192848",
    appId: "1:1061945192848:web:0ba8c8969282c4731a0315"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//export
export const auth = getAuth(app); 
export const db = getFirestore(app); 
export const googleProvider = new GoogleAuthProvider();
