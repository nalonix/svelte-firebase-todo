// Import the functions you need from the SDKs you need
import { getApps, deleteApp, getApp,initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCR3uHo2tsRHg4Yb5OwHjXgWz17PXyp03s",
  authDomain: "svelte-crud-ffb46.firebaseapp.com",
  projectId: "svelte-crud-ffb46",
  storageBucket: "svelte-crud-ffb46.appspot.com",
  messagingSenderId: "851428174314",
  appId: "1:851428174314:web:3e60cf25df16ebbe51aa93"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
let firebaseApp;
if(!getApps().length){
    firebaseApp = initializeApp(firebaseConfig)
}else{
    firebaseApp = getApp()
    deleteApp(firebaseApp)
    firebaseApp = initializeApp(firebaseConfig);
}

export const db = getFirestore(firebaseApp)
export const auth = getAuth(firebaseApp)
