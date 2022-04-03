
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDVt83awvg9sfzEihxCidzWJv0Sdu3vzlk",
  authDomain: "fir-259ba.firebaseapp.com",
  databaseURL: "https://fir-259ba-default-rtdb.firebaseio.com",
  projectId: "fir-259ba",
  storageBucket: "fir-259ba.appspot.com",
  messagingSenderId: "840001398025",
  appId: "1:840001398025:web:67e5c58dbbe5ff7d201fd8"
};


const firebase = initializeApp(firebaseConfig);

const auth=getAuth(firebase);
const db=getFirestore(firebase);


const signInWithEmailAndPassword = async (email, password) => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

const registerWithEmailAndPassword = async (email, password) => {
    try {
      const res = await auth.createUserWithEmailAndPassword(email, password);
      const user = res.user;
      await db.collection("users").add({
        uid: user.uid,
        authProvider: "local",
        email,
      });
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

export {auth,registerWithEmailAndPassword,signInWithEmailAndPassword,db,firebase};




