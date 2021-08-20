import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBDEyK7dWxHG_fPlFucujf0V7W-vD0weYs",
  authDomain: "vine-a03aa.firebaseapp.com",
  projectId: "vine-a03aa",
  storageBucket: "vine-a03aa.appspot.com",
  messagingSenderId: "279021516678",
  appId: "1:279021516678:web:7d4982c8193a8e89ae5e07",
  measurementId: "G-C1CS4VR5N0",
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const createUserProfileDocument = async (
  userAuth: firebase.User,
  additionalData?: any[]
) => {
  if (!userAuth) return;
  const userDoc = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userDoc.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userDoc.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
        categories: [],
        routines: [],
        tasks: [],
      });
    } catch (error) {
      console.log("error creating user: ", error.message);
    }
  }
  return userDoc;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
