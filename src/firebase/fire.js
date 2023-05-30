import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";



const config = { /* COPY THE ACTUAL CONFIG FROM FIREBASE CONSOLE */
    apiKey: "AIzaSyCTr_89WWDBd1zF4iggWIM5q0EH4NWCZ6g",
    authDomain: "hh-project-957c0.firebaseapp.com",
    projectId: "hh-project-957c0",
    storageBucket: "hh-project-957c0.appspot.com",
    messagingSenderId: "519822844271",
    appId: "1:519822844271:web:beb5a6ef4822bd54f3489a",
    measurementId: "G-RHBVYFEGXK"
};
const fire = initializeApp(config);
const auth = getAuth(fire);
const provider = new GoogleAuthProvider();
export { auth, provider };
