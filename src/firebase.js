import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';


const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyC_4nxggxQCLg-YWeYtJGJbXeeGq3QM8D0",
    authDomain: "messaging-coding-hw.firebaseapp.com",
    databaseURL: "https://messaging-coding-hw-default-rtdb.firebaseio.com",
    projectId: "messaging-coding-hw",
    storageBucket: "messaging-coding-hw.appspot.com",
    messagingSenderId: "1047897938475",
    appId: "1:1047897938475:web:2bb4999261ba0e17f0a86e",
    measurementId: "G-PW6ZKH39E1"
})

const db = firebaseApp.firestore()

const auth = firebase.auth()

export { db, auth }
