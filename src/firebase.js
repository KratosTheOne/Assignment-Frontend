import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDrI4J9_iygQYR4SG8PQiAONy2j5i5RG68",
  authDomain: "mapsdatabase-ea31f.firebaseapp.com",
  projectId: "mapsdatabase-ea31f",
  storageBucket: "mapsdatabase-ea31f.appspot.com",
  messagingSenderId: "201746746163",
  appId: "1:201746746163:web:1b569679094f13d76fcc46",
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

export default db;
