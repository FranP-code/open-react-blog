// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "open-react-blog.firebaseapp.com",
  projectId: "open-react-blog",
  storageBucket: "open-react-blog.appspot.com",
  messagingSenderId: "14650159763",
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export {firebase}