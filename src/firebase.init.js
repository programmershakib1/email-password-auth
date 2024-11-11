// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhcifqEh-k90eRH8GZtzmLhepyq0xGxd4",
  authDomain: "email-password-auth-91a21.firebaseapp.com",
  projectId: "email-password-auth-91a21",
  storageBucket: "email-password-auth-91a21.firebasestorage.app",
  messagingSenderId: "963752656754",
  appId: "1:963752656754:web:da19350af74275eb6227eb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);