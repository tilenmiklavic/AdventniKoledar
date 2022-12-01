import firebase from 'firebase/app'
import 'firebase/auth'
import { firebaseConfig } from './config';
import { initializeApp } from "firebase/app"
// import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref } from "firebase/database";


firebase.initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
