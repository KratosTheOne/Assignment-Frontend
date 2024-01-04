import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDrI4J9_iygQYR4SG8PQiAONy2j5i5RG68",
  authDomain: "mapsdatabase-ea31f.firebaseapp.com",
  projectId: "mapsdatabase-ea31f",
  storageBucket: "mapsdatabase-ea31f.appspot.com",
  messagingSenderId: "201746746163",
  appId: "1:201746746163:web:1b569679094f13d76fcc46",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firestore instance
const db = getFirestore(app);

export default db;
