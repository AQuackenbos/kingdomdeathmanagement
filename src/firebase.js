import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/analytics';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBmSsnVV-42ImI7NTs3l02H_-6WLl63CiA",
  authDomain: "kingdomdeathmanagement.firebaseapp.com",
  databaseURL: "https://kingdomdeathmanagement.firebaseio.com",
  projectId: "kingdomdeathmanagement",
  storageBucket: "kingdomdeathmanagement.appspot.com",
  messagingSenderId: "577246476472",
  appId: "1:577246476472:web:f19bf30a4700bd1baf5c4d",
  measurementId: "G-1VZ07JWF07"
};


// Initialize Firebase
var app = firebase.initializeApp(firebaseConfig)
firebase.analytics()

const auth = app.auth()
const db = app.firestore()

const login = function() {
  const provider = new app.auth.GoogleAuthProvider();
  app.auth().signInWithPopup(provider)
  .then(function(result) {
    console.log(result);
  })
  .catch(function(error){
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.email;
    const credential = error.credential;
    console.log(errorCode, errorMessage, email, credential);
    })
}

const logout = function() {
  app.auth().signOut()
  .then(function() {})
  .catch(function(error) {
    console.log(error)});
};

export {
	app as firebase,
	auth,
	db, 
    login,
    logout
}