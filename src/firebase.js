// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC9W01ec3oHp_7tfVfUrs_PYnoHGbMmpAY",
  authDomain: "maps-db-cms.firebaseapp.com",
  projectId: "maps-db-cms",
  storageBucket: "maps-db-cms.appspot.com",
  messagingSenderId: "1087005587612",
  appId: "1:1087005587612:web:bb1e28d7b9ec3afb175559",
  measurementId: "G-G8D089Y0KM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

// Get Firestore instance
const db = getFirestore(app);

export default db;
