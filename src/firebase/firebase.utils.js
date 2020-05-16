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

export const createUserProfileDocument = async(userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    console.log(snapShot.exists);

    if(!snapShot.exists) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } catch (error) {
            console.log('error creating a user', error.message)
        }
    }

    return userRef;
}

export default firebase;
