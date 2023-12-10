// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB7TkmBWGhW26p0fP7NPgV6DqQp_wMLsDY",
  authDomain: "elma-firebase.firebaseapp.com",
  projectId: "elma-firebase",
  storageBucket: "elma-firebase.appspot.com",
  messagingSenderId: "839152171767",
  appId: "1:839152171767:web:2e82142689ed881607f1f2",
  measurementId: "G-6RK136EBWY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// eslint-disable-next-line
const analytics = getAnalytics(app);

export const auth = getAuth(app);