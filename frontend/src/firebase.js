// Firebase config and initialization for OTP authentication
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Replace with your Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyAPwmXxyaOAfzkDzg5fsoBRWIswzG4sIbM",
  authDomain: "fake-news-detector-86d54.firebaseapp.com",
  projectId: "fake-news-detector-86d54",
  storageBucket: "fake-news-detector-86d54.appspot.com",
  messagingSenderId: "247484274073",
  appId: "1:247484274073:web:f86e6b0af4dfefeb312f08",
  measurementId: "G-7R4P15QRER"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
