import firebase from "firebase";

// Initialize Firebase
const config = {
  apiKey: "AIzaSyD18_K8I0UJ85AbNmoJJsGnoQqM0V2cW3o",
  authDomain: "movielist-9fe66.firebaseapp.com",
  databaseURL: "https://movielist-9fe66.firebaseio.com",
  projectId: "movielist-9fe66",
  storageBucket: "movielist-9fe66.appspot.com",
  messagingSenderId: "359435790139"
};

firebase.initializeApp(config);

export const db = firebase.firestore();

export default firebase;
