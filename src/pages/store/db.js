import firebase from "firebase/firebase"
var firebaseConfig = {
    apiKey: "AIzaSyCYnrw7WRDwxc-imezt5-3tYazyW8TR8Xw",
    authDomain: "cjtchat-a2307.firebaseapp.com",
    projectId: "cjtchat-a2307",
    storageBucket: "cjtchat-a2307.appspot.com",
    messagingSenderId: "793694638009",
    appId: "1:793694638009:web:ae42dde75d6bb190d3b068",
    measurementId: "G-S9L162510M"
  };
  firebase.initializeApp(firebaseConfig);
export const firerequest =  firebase.database().ref('/requests');