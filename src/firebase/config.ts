import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, getDoc, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBDEyK7dWxHG_fPlFucujf0V7W-vD0weYs",
  authDomain: "vine-a03aa.firebaseapp.com",
  projectId: "vine-a03aa",
  storageBucket: "vine-a03aa.appspot.com",
  messagingSenderId: "279021516678",
  appId: "1:279021516678:web:7d4982c8193a8e89ae5e07",
  measurementId: "G-C1CS4VR5N0",
};

const firebaseApp = initializeApp(firebaseConfig);
// firebase.analytics();

export const createUserProfileDocument = async (
  userAuth: any,
  additionalData?: any[]
) => {
  if (!userAuth) return;
  const userDoc = doc(firestore, `users/${userAuth.uid}`);
  const snapShot = await getDoc(userDoc);

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDoc, {
        displayName,
        email,
        createdAt,
        ...additionalData,
        categories: [],
        routines: [],
        tasks: [],
      });
    } catch (error: any) {
      console.log("error creating user: ", error.message);
    }
  }
  return userDoc;
};

export const auth = getAuth(firebaseApp);
export const firestore = getFirestore(firebaseApp);

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);

export default firebaseApp;
