import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBphtHNHLWZwGIcfwCYoL5DUIPdzY32IP0",
  authDomain: "mottu-t.firebaseapp.com",
  projectId: "mottu-t",
  storageBucket: "mottu-t.firebasestorage.app",
  messagingSenderId: "804227856531",
  appId: "1:804227856531:web:a4fedfb6329bce2e323566",
  measurementId: "G-K4CV93CJ3P"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
