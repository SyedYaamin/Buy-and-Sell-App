import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-storage.js";


const firebaseConfig = {
    apiKey: "AIzaSyB1SR-Mm7lbqBxAmd5ORLowCGdNzjnLkPc",
    authDomain: "buy-sell-app-56c51.firebaseapp.com",
    projectId: "buy-sell-app-56c51",
    storageBucket: "buy-sell-app-56c51.appspot.com",
    messagingSenderId: "163518989683",
    appId: "1:163518989683:web:924e5ef0b4b9ba41093106",
    measurementId: "G-4PBRM5XVL1"
  };


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);