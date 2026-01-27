import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyARhE5vbtF2UVLuJBeOuLb2kj40c7OSLoo",
  authDomain: "newsalamat-a82f0.firebaseapp.com",
  projectId: "newsalamat-a82f0",
  storageBucket: "newsalamat-a82f0.firebasestorage.app",
  messagingSenderId: "260365262728",
  appId: "1:260365262728:web:38063133f5f854cf83e43d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);
