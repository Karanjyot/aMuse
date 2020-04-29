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
    // apiKey: process.env.REACT_APP_API_KEY,
    // authDomain:process.env.REACT_APP_AUTH_DOMAIN,
    // databaseURL: process.env.REACT_APP_DB_URL,
    // projectId: process.env.REACT_APP_PROJECT_ID,
    // storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    // messagingSenderId: process.env.REACT_APP_MSG_SENDER_ID,
    // appId: process.env.REACT_APP_APP_ID,
    // measurementId: process.env.REACT_APP_MEASURENEMEN,
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export default firebaseConfig;