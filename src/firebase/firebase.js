
// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import firebase from "firebase/compat/app"
import "firebase/compat/firestore"
import "firebase/compat/auth";
import "firebase/compat/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "*************",
  authDomain: "*************",
  databaseURL: "****************",
  projectId: "****************",
  storageBucket: "****************",
  messagingSenderId: "****************3",
  appId: "****************"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;