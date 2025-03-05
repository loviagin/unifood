// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZXtIN5ny6XhSO8Zwjv7pZUXQEMdQ6jqQ",
  authDomain: "unifood-12b74.firebaseapp.com",
  projectId: "unifood-12b74",
  storageBucket: "unifood-12b74.firebasestorage.app",
  messagingSenderId: "128963616797",
  appId: "1:128963616797:web:d6b117a2446d52f66f26f4"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export default firebase;