import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
const firebaseConfig = {
    apiKey: "AIzaSyAaBTYqnQDXWs2pO5VwLc3SP2bbO_DfmpY",
    authDomain: "for-her-c8653.firebaseapp.com",
    projectId: "for-her-c8653",
    storageBucket: "for-her-c8653.appspot.com",
    messagingSenderId: "362836800380",
    appId: "1:362836800380:web:e18383e8c95b6e68c4aaf9",
    measurementId: "G-4ZR0MVDY1S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getAuth(app);