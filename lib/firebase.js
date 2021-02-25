import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: 'AIzaSyAh0U6clF1iMaxQpPnkPuYvSAVoX8F5m40',
    authDomain: 'fir-next-44561.firebaseapp.com',
    projectId: 'fir-next-44561',
    storageBucket: 'fir-next-44561.appspot.com',
    messagingSenderId: '249422326699',
    appId: '1:249422326699:web:095bd4ccb178ae9c4400ee',
    measurementId: 'G-BZL9Y0ZYLM',
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}


export async function getUserWithUsername(username) {
    const usersRef = firestore.collection('users');
    const query = usersRef.where('username', '==', username).limit(1);
    const userDoc = (await query.get()).docs[0];
    return userDoc;
}

export function postToJSON(doc) {
    const data = doc.data();
    return {
        ...data,

        createdAt: data.createdAt.toMillis(),
        updatedAt: data.updatedAt.toMillis(),
    };
}
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;
export const fromMillis = firebase.firestore.Timestamp.fromMillis;
export const Auth = firebase.auth();
export const GoogleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const STATE_CHANGED = firebase.storage.TaskEvent.STATE_CHANGED;
export const increment = firebase.firestore.FieldValue.increment;