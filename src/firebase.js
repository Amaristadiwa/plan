// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyAw14GjqttlRI6tqEH1acG5QdJkNRc41hs",
  authDomain: "wedding-planner-489c5.firebaseapp.com",
  projectId: "wedding-planner-489c5",
  storageBucket: "wedding-planner-489c5.appspot.com",
  messagingSenderId: "585588665659",
  appId: "1:585588665659:web:4f0fe04615b53c44d0db1e",
  measurementId: "G-F5PWDGTGB4"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db }; 

