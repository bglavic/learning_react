import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDtbYvCZ8BgOFWICbPoegevHEVSufDtA4s",
  authDomain: "react-test-4d82c.firebaseapp.com",
  databaseURL: "https://react-test-4d82c.firebaseio.com",
  projectId: "react-test-4d82c",
  storageBucket: "react-test-4d82c.appspot.com",
  messagingSenderId: "1007510874116",
  appId: "1:1007510874116:web:13cd6265bc833e00476d51"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
