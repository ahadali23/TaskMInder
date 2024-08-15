import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDwX-JRibTeCnVyELjWxQmsGhaOMpN_aBY',
  authDomain: 'taskminder-391216.firebaseapp.com',
  projectId: 'taskminder-391216',
  storageBucket: 'taskminder-391216.appspot.com',
  messagingSenderId: '322924491060',
  appId: '1:322924491060:web:7f70224169b30e0502f561',
  measurementId: 'G-TDM74DBWYK',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
export const db = getFirestore(app);
