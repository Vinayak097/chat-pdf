
import { initializeApp } from "firebase/app";
import { getApps,getApp } from "firebase/app";
import { FirebaseStorage, getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBEREHMKJq5yBTED7CQjqLZB2cqcZveI7U",
  authDomain: "pdf-chat-4e254.firebaseapp.com",
  projectId: "pdf-chat-4e254",
  storageBucket: "pdf-chat-4e254.appspot.com",
  messagingSenderId: "28273989234",
  appId: "1:28273989234:web:1a5c2167f23e287f8c54eb"
};


// Initialize Firebase

const app =getApps().length==0 ? initializeApp(firebaseConfig):getApp()
const db=getFirestore(app)
const storage=getStorage(app);

export {db,storage}

