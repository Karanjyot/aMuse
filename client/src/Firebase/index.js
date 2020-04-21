import firebase from 'firebase/app';
import "firebase/storage";

var firebaseConfig = {
    // apiKey: "AIzaSyBfcdxQgnw65W-0NkmgQfrSxOjdfXXgo8c",
    // authDomain: "amuse-f8ada.firebaseapp.com",
    // databaseURL: "https://amuse-f8ada.firebaseio.com",
    // projectId: "amuse-f8ada",
    // storageBucket: "amuse-f8ada.appspot.com",
    // messagingSenderId: "823202468853",
    // appId: "1:823202468853:web:da0342efd847077c1a86bc",
    // measurementId: "G-03F689M0ST"
    apiKey: "AIzaSyBkajcqNQj05aHmPL1IlGfv3Kp4BZ6I86w",
    authDomain: "music-app-92027.firebaseapp.com",
    databaseURL: "https://music-app-92027.firebaseio.com",
    projectId: "music-app-92027",
    storageBucket: "music-app-92027.appspot.com",
    messagingSenderId: "78664938916",
    appId: "1:78664938916:web:7a70dc0b8e05f31b0d7d31",
    measurementId: "G-4CFFZFMW9S"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export default firebaseConfig;