// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
// import { getFirestore } from "firebase/firestore";
// import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import "firebase/compat/firestore";// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB8ZbYoyPWgXmrabQV0VWsjjuPnwt8oCIY",
  authDomain: "devrevlms.firebaseapp.com",
  databaseURL: "https://devrevlms-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "devrevlms",
  storageBucket: "devrevlms.appspot.com",
  messagingSenderId: "83045867749",
  appId: "1:83045867749:web:538a9fb6a66d862577f40c",
  measurementId: "G-0135228GEH"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db=app.firestore();
const auth=getAuth(app);
export {db,auth};