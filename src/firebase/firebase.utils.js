import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDHFKEgyg3_GmApV2dWTpjEyw9jmIcSics",
    authDomain: "crwn-db-d910f.firebaseapp.com",
    databaseURL: "https://crwn-db-d910f.firebaseio.com",
    projectId: "crwn-db-d910f",
    storageBucket: "crwn-db-d910f.appspot.com",
    messagingSenderId: "917494351503",
    appId: "1:917494351503:web:9319eda44b5a7e4a0792fa",
    measurementId: "G-CSE1FEF9NV"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
