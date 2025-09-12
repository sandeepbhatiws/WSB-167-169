// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBB30rWMSOnJ1_-JLovqyZMu8yY5IxewVA",
  authDomain: "wsb-167-169.firebaseapp.com",
  databaseURL: "https://wsb-167-169-default-rtdb.firebaseio.com",
  projectId: "wsb-167-169",
  storageBucket: "wsb-167-169.firebasestorage.app",
  messagingSenderId: "491648750481",
  appId: "1:491648750481:web:f611f6cd4186d51b568030"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;