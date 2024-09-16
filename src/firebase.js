import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBIRGGAYw6JAsnHrlu8S4xXrTFVKFoxtIE",
  authDomain: "finance-tracker-494f8.firebaseapp.com",
  projectId: "finance-tracker-494f8",
  storageBucket: "finance-tracker-494f8.appspot.com",
  messagingSenderId: "902180755112",
  appId: "1:902180755112:web:308df731921b701d74949d",
  measurementId: "G-YP3H8V41M8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, auth, provider, doc, setDoc };
