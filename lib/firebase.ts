import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Firebase 앱 초기화
const app = initializeApp(firebaseConfig);

// Firestore 데이터베이스 초기화
export const db = getFirestore(app);

// Firebase Auth 초기화 (API 키가 있을 때만)
export const auth = process.env.NEXT_PUBLIC_FIREBASE_API_KEY
  ? getAuth(app)
  : null;

// Firebase Storage 초기화
export const storage = getStorage(app);

export default app;
