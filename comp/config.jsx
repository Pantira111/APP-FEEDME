// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyByA_RtiDle0WrlSTifZxj1ElTinnabvrA",
  authDomain: "feedme-createparty.firebaseapp.com",
  databaseURL: "https://feedme-createparty-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "feedme-createparty",
  storageBucket: "feedme-createparty.appspot.com",
  messagingSenderId: "623535333515",
  appId: "1:623535333515:web:04fd2ebbeb63ec1193748e",
  measurementId: "G-8S95RLFRL4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
// const analytics = getAnalytics(app);

