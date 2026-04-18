import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import { getStorage } from 'firebase/storage';

export const firebaseConfig = {
  apiKey: 'AIzaSyAMARpBdJBZKSJpEwgwAKZmaxjB18JraRo',
  authDomain: 'wayzentech-db.firebaseapp.com',
  projectId: 'wayzentech-db',
  storageBucket: 'wayzentech-db.firebasestorage.app',
  messagingSenderId: '564540262247',
  appId: '1:564540262247:web:1a2d2ebc2c2de236b891c2'
};

const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);
export default firebaseApp;
