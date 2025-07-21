// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
// import { getAnalytics } from "firebase/analytics"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBOn-MgRmL4_qRSDWLg5Chc0up9feuhl60",
  authDomain: "e-commerce-2-d9546.firebaseapp.com",
  projectId: "e-commerce-2-d9546",
  storageBucket: "e-commerce-2-d9546.firebasestorage.app",
  messagingSenderId: "80113667005",
  appId: "1:80113667005:web:149fee5ad2ab83bdad60d4",
  measurementId: "G-H78748KSGG",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app)
const auth = getAuth(app)
const fireDB = getFirestore(app)

// Step 3: Export
export { auth, fireDB }
