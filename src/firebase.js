import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCZnaxuGNrM2vPrOso72JOqBs8OzCBaeaQ",
  authDomain: "fittrack-2246a.firebaseapp.com",
  projectId: "fittrack-2246a",
  storageBucket: "fittrack-2246a.firebasestorage.app",
  messagingSenderId: "740809670420",
  appId: "1:740809670420:web:32517205e3575e610ccc01",
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
