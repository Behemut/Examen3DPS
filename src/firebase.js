import firebase from 'firebase/app';
import 'firebase/firestore';
import "firebase/auth";
import "firebase/firestore";
import "firebase/database"


var firebaseConfig = {
    apiKey: "AIzaSyCR3UC8AJ8z22QIFt4IpTkcEhMUrdKSJ9c",
    authDomain: "authangularfirebase-b6e2a.firebaseapp.com",
    databaseURL: "https://authangularfirebase-b6e2a.firebaseio.com",
    projectId: "authangularfirebase-b6e2a",
    storageBucket: "authangularfirebase-b6e2a.appspot.com",
    messagingSenderId: "611987190644",
    appId: "1:611987190644:web:a0a7de1bcb514c142d3221",
    measurementId: "G-YRS12CHDS6"
  };
  // Initialize Firebase
 
  var fireDb = firebase.initializeApp(firebaseConfig)
  export default fireDb.database().ref();
  // or if you prefer to assign the result to a variable before exporting
  
