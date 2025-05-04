// src/utils/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBebpcuRiiz1wFbluyjsEP6WhQfXy-Q4j4",
    authDomain: "jcreations-a3442.firebaseapp.com",
    projectId: "jcreations-a3442",
    storageBucket: "jcreations-a3442.firebasestorage.app",
    messagingSenderId: "57316628159",
    appId: "1:57316628159:web:e191f365e8784828f9180a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };