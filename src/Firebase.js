import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC7Z5D3DOYeSNKtyZuDwSlBGsQRJTnZkXM",
    authDomain: "pokemmo-berry-ms.firebaseapp.com",
    projectId: "pokemmo-berry-ms",
    storageBucket: "pokemmo-berry-ms.appspot.com",
    messagingSenderId: "831264065367",
    appId: "1:831264065367:web:3e4fb0c583a2b83012e012",
    measurementId: "G-2KJS6E0HRN",
};

export default !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();