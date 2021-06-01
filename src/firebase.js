import firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";
import "firebase/performance";
import "firebase/storage";

//replace this with your firebase config
const firebaseConfig = {};
firebase.initializeApp(firebaseConfig);
export default firebase;  
