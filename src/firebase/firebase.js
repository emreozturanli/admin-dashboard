import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDuvzmNbpoBMm1bMNVLAGrjQiGoc6FS2MY",
  authDomain: "admin-dashboard-2a83c.firebaseapp.com",
  databaseURL: "https://admin-dashboard-2a83c-default-rtdb.firebaseio.com",
  projectId: "admin-dashboard-2a83c",
  storageBucket: "admin-dashboard-2a83c.appspot.com",
  messagingSenderId: "683246985083",
  appId: "1:683246985083:web:f5c21b6a90eb4cc81c67de"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app)