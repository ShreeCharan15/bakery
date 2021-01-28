import firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";
import "firebase/performance";
import "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCDRMXUhPXi9XVQ0vrv3iXeHzhBsqzqgtU",
  authDomain: "bakery-a9c04.firebaseapp.com",
  projectId: "bakery-a9c04",
  storageBucket: "bakery-a9c04.appspot.com",
  messagingSenderId: "175876821083",
  appId: "1:175876821083:web:b810884c7d4ed05dcc2f7e",
  measurementId: "G-156196JB3C"
};
firebase.initializeApp(firebaseConfig);
export default firebase;  