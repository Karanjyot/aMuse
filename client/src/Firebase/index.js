import firebase from 'firebase/app';
import "firebase/storage";

var firebaseConfig = {
    apiKey: "AIzaSyBfcdxQgnw65W-0NkmgQfrSxOjdfXXgo8c",
    authDomain: "amuse-f8ada.firebaseapp.com",
    databaseURL: "https://amuse-f8ada.firebaseio.com",
    projectId: "amuse-f8ada",
    storageBucket: "amuse-f8ada.appspot.com",
    messagingSenderId: "823202468853",
    appId: "1:823202468853:web:da0342efd847077c1a86bc",
    measurementId: "G-03F689M0ST"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export default firebaseConfig;