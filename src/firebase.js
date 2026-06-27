import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDIFNWEujjCgIVqVdmCpODViALYem3T2kk",
  authDomain: "biolife-iovenitti.firebaseapp.com",
  projectId: "biolife-iovenitti",
  storageBucket: "biolife-iovenitti.firebasestorage.app",
  messagingSenderId: "874668863927",
  appId: "1:874668863927:web:717242e68287b6dd297832"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
