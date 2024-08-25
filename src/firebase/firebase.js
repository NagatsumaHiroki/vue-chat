
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
  apiKey: "AIzaSyAZGIh555wJ9HIqwKa4GPoDnr8EvmARV84",
  authDomain: "vue-sample-chat-dfbec.firebaseapp.com",
  databaseURL: "https://vue-sample-chat-dfbec-default-rtdb.firebaseio.com",
  projectId: "vue-sample-chat-dfbec",
  storageBucket: "vue-sample-chat-dfbec.appspot.com",
  messagingSenderId: "235354364643",
  appId: "1:235354364643:web:f1517ad8556099e603c3d6"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;